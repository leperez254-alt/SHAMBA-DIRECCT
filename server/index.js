import "dotenv/config";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import connectPgSimple from "connect-pg-simple";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import session from "express-session";
import helmet from "helmet";
import { z } from "zod";
import { initializeDatabase, pool } from "./db.js";
import {
  createMpesaStkPush,
  createStripeCheckout,
  createStripeSubscriptionCheckout,
  getStripeSubscription,
  getAvailablePaymentMethods,
  isValidMpesaPhone,
  queryMpesaStkStatus,
  setStripeSubscriptionCancellation,
  verifyStripeWebhook
} from "./payments.js";
import { isEmailConfigured, sendAccountEmail } from "./email.js";
import { createImageUpload, isStorageConfigured, verifyUploadedImage } from "./storage.js";

const app = express();
const port = Number(process.env.PORT || 3000);
const production = process.env.NODE_ENV === "production";
const appOrigin = process.env.APP_ORIGIN || `http://localhost:${port}`;
const additionalCorsOrigins = (process.env.ADDITIONAL_CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const publicRoot = path.join(root, "public");
const PgSession = connectPgSimple(session);

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL must be set.");
if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32 || /replace-with|change-me|example/i.test(process.env.SESSION_SECRET)) {
  throw new Error("SESSION_SECRET must contain at least 32 characters.");
}
if (production) {
  for (const [name, value] of [["APP_ORIGIN", process.env.APP_ORIGIN], ["PUBLIC_APP_URL", process.env.PUBLIC_APP_URL]]) {
    let url;
    try { url = new URL(value); } catch { throw new Error(`${name} must be the HTTPS origin of the deployed app.`); }
    if (url.protocol !== "https:" || url.origin !== value.replace(/\/$/, "")) {
      throw new Error(`${name} must be an HTTPS origin without a path.`);
    }
  }
  for (const origin of additionalCorsOrigins) {
    let url;
    try { url = new URL(origin); } catch { throw new Error("ADDITIONAL_CORS_ORIGINS must contain valid HTTPS origins."); }
    if (url.protocol !== "https:" || url.origin !== origin) {
      throw new Error("ADDITIONAL_CORS_ORIGINS must contain HTTPS origins without paths.");
    }
  }
}

app.set("trust proxy", production ? 1 : false);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, false);
    if ([appOrigin, ...additionalCorsOrigins].includes(origin)) return callback(null, origin);
    callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "X-CSRF-Token"]
}));

app.post("/api/payments/stripe/webhook", express.raw({ type: "application/json" }), async (req, res, next) => {
  try {
    const event = verifyStripeWebhook(req.body, req.headers["stripe-signature"]);
    if (event.type === "checkout.session.completed" && event.data.object.payment_status === "paid") {
      const checkout = event.data.object;
      const orderId = checkout.metadata?.orderId;
      if (orderId) await markOrderPaid(orderId, "stripe", checkout.id);
    }
    if (event.type === "checkout.session.expired") {
      const orderId = event.data.object.metadata?.orderId;
      if (orderId) await cancelPendingOrder(orderId);
      if (event.data.object.mode === "subscription") {
        await pool.query(
          "UPDATE subscriptions SET status = 'cancelled', updated_at = NOW() WHERE stripe_checkout_session_id = $1 AND status = 'pending'",
          [event.data.object.id]
        );
      }
    }
    if (event.type === "checkout.session.completed" && event.data.object.mode === "subscription") {
      await activateStripeSubscription(event.data.object);
    }
    if (["customer.subscription.updated", "customer.subscription.deleted"].includes(event.type)) {
      await syncStripeSubscription(event.data.object);
    }
    if (event.type === "invoice.payment_failed" && event.data.object.subscription) {
      await pool.query(
        "UPDATE subscriptions SET status = 'past_due', updated_at = NOW() WHERE stripe_subscription_id = $1",
        [event.data.object.subscription]
      );
    }
    res.json({ received: true });
  } catch (error) {
    if (error.type?.startsWith("StripeSignatureVerificationError")) return res.status(400).json({ error: "Invalid webhook signature." });
    next(error);
  }
});

app.use(express.json({ limit: "1mb" }));
app.use(session({
  name: "shamba.sid",
  store: new PgSession({
    pool,
    tableName: "user_sessions",
    createTableIfMissing: true,
    pruneSessionInterval: 60 * 15
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: production,
    sameSite: production ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

const safeEqual = (left, right) => {
  if (typeof left !== "string" || typeof right !== "string") return false;
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
};
app.use("/api", (req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method) || req.path === "/csrf" || req.path === "/health" || req.path === "/payments/stripe/webhook" || req.path === "/payments/mpesa/callback") return next();
  if (!safeEqual(req.get("X-CSRF-Token"), req.session.csrfToken)) return res.status(403).json({ error: "Refresh the page and try again." });
  next();
});

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-7", legacyHeaders: false });
const paymentLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 12, standardHeaders: "draft-7", legacyHeaders: false });
const uploadLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 30, standardHeaders: "draft-7", legacyHeaders: false });
const emailSchema = z.string().email().max(254).transform((value) => value.toLowerCase());
const passwordSchema = z.string().min(12).max(128);
const registrationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  role: z.enum(["buyer", "farmer", "business"]),
  name: z.string().trim().min(2).max(80),
  farmName: z.string().trim().min(2).max(80).optional(),
  location: z.string().trim().min(2).max(80).optional()
});

const subscriptionPlans = {
  farmer: [
    { id: "starter", name: "Starter", price: 500 },
    { id: "standard", name: "Standard", price: 1000 },
    { id: "premium", name: "Premium", price: 2500 }
  ],
  business: [
    { id: "basic", name: "Basic", price: 2000 },
    { id: "professional", name: "Professional", price: 3000 },
    { id: "enterprise", name: "Enterprise", price: 5000 }
  ]
};

function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

function createToken() {
  return randomBytes(32).toString("base64url");
}

async function createAuthToken(userId, purpose) {
  const token = createToken();
  await pool.query(
    "INSERT INTO auth_tokens (user_id, purpose, token_hash, expires_at) VALUES ($1, $2, $3, NOW() + $4::interval)",
    [userId, purpose, hashToken(token), purpose === "verify_email" ? "24 hours" : "1 hour"]
  );
  return token;
}

function appUrl(pathname, token) {
  const url = new URL("/", process.env.PUBLIC_APP_URL);
  url.searchParams.set(pathname === "/verify-email" ? "verify" : "reset", token);
  return url.toString();
}

async function activateStripeSubscription(checkout) {
  const userId = checkout.metadata?.userId;
  const accountType = checkout.metadata?.accountType;
  const planId = checkout.metadata?.planId;
  if (!userId || !["farmer", "business"].includes(accountType)) return;
  const plan = subscriptionPlans[accountType].find((entry) => entry.id === planId);
  if (!plan) throw new Error("Stripe subscription contains an unknown plan.");
  const subscriptionId = typeof checkout.subscription === "string" ? checkout.subscription : checkout.subscription?.id;
  if (!subscriptionId) throw new Error("Stripe subscription checkout has no subscription ID.");
  const subscription = await getStripeSubscription(subscriptionId);
  await pool.query(
    `INSERT INTO subscriptions (user_id, account_type, plan_id, status, provider, stripe_subscription_id,
       stripe_checkout_session_id, current_period_start, current_period_end, cancel_at_period_end)
     VALUES ($1, $2, $3, $4, 'stripe', $5, $6, TO_TIMESTAMP($7), TO_TIMESTAMP($8), $9)
     ON CONFLICT (user_id) DO UPDATE SET account_type = EXCLUDED.account_type, plan_id = EXCLUDED.plan_id,
       status = EXCLUDED.status, provider = EXCLUDED.provider, stripe_subscription_id = EXCLUDED.stripe_subscription_id,
       stripe_checkout_session_id = EXCLUDED.stripe_checkout_session_id, current_period_start = EXCLUDED.current_period_start,
       current_period_end = EXCLUDED.current_period_end, cancel_at_period_end = EXCLUDED.cancel_at_period_end, updated_at = NOW()`,
    [userId, accountType, planId, subscription.status === "active" ? "active" : "pending",
      subscription.id, checkout.id, subscription.current_period_start, subscription.current_period_end, subscription.cancel_at_period_end]
  );
  await pool.query("UPDATE users SET stripe_customer_id = COALESCE(stripe_customer_id, $2) WHERE id = $1", [userId, checkout.customer]);
}

async function completeManualSubscriptionRenewal(renewalId, receiptNumber) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      `UPDATE manual_subscription_renewals SET status = 'paid', payment_reference = $2
       WHERE id = $1 AND status = 'pending' AND expires_at > NOW()
       RETURNING user_id, plan_id`,
      [renewalId, receiptNumber]
    );
    if (!result.rowCount) {
      await client.query("ROLLBACK");
      return false;
    }
    await client.query(
      `UPDATE subscriptions SET plan_id = $2, status = 'active', provider = 'mpesa_manual',
         current_period_start = NOW(), current_period_end = NOW() + INTERVAL '30 days',
         cancel_at_period_end = FALSE, updated_at = NOW() WHERE user_id = $1`,
      [result.rows[0].user_id, result.rows[0].plan_id]
    );
    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function syncStripeSubscription(subscription) {
  const status = subscription.status === "active" ? "active"
    : subscription.status === "past_due" ? "past_due"
      : ["canceled", "unpaid", "incomplete_expired"].includes(subscription.status) ? "cancelled" : "pending";
  await pool.query(
    `UPDATE subscriptions SET status = $2, current_period_start = TO_TIMESTAMP($3),
       current_period_end = TO_TIMESTAMP($4), cancel_at_period_end = $5, updated_at = NOW()
     WHERE stripe_subscription_id = $1`,
    [subscription.id, status, subscription.current_period_start, subscription.current_period_end, subscription.cancel_at_period_end]
  );
}

function requireAuth(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: "Sign in to continue." });
  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.session.user || !roles.includes(req.session.user.role)) return res.status(403).json({ error: "You do not have permission to do that." });
    next();
  };
}

function parseOrRespond(schema, value, res) {
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    res.status(400).json({ error: "Check the submitted details.", details: parsed.error.issues.map(({ path: fields, message }) => ({ field: fields.join("."), message })) });
    return null;
  }
  return parsed.data;
}

async function markOrderPaid(orderId, provider, providerReference) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const order = await client.query("SELECT payment_status FROM orders WHERE id = $1 FOR UPDATE", [orderId]);
    if (!order.rowCount || order.rows[0].payment_status !== "pending") {
      await client.query("ROLLBACK");
      return false;
    }
    const payment = await client.query(
      `UPDATE payment_attempts SET status = 'paid', provider_reference = COALESCE(provider_reference, $3), updated_at = NOW()
       WHERE order_id = $1 AND provider = $2 AND status = 'pending' RETURNING order_id`,
      [orderId, provider, providerReference]
    );
    if (!payment.rowCount) {
      await client.query("ROLLBACK");
      return false;
    }
    await client.query("UPDATE orders SET payment_status = 'paid', updated_at = NOW() WHERE id = $1", [orderId]);
    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function cancelPendingOrder(orderId, buyerId) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      `UPDATE orders SET payment_status = 'failed', status = 'cancelled', updated_at = NOW()
       WHERE id = $1 AND payment_status IN ('pending', 'awaiting_manual_confirmation')
         AND ($2::uuid IS NULL OR buyer_id = $2)
       RETURNING id, items`,
      [orderId, buyerId || null]
    );
    if (!result.rowCount) {
      await client.query("ROLLBACK");
      return false;
    }
    await client.query(
      "UPDATE payment_attempts SET status = 'failed', updated_at = NOW() WHERE order_id = $1 AND status = 'pending'",
      [orderId]
    );
    for (const item of result.rows[0].items) {
      await client.query("UPDATE products SET stock = stock + $1, updated_at = NOW() WHERE id = $2", [item.quantity, item.productId]);
    }
    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function expirePendingPayments() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const expired = await client.query(
      `SELECT id, items FROM orders
       WHERE payment_status = 'pending' AND status = 'received'
         AND created_at < NOW() - INTERVAL '30 minutes'
       ORDER BY created_at ASC LIMIT 100 FOR UPDATE SKIP LOCKED`
    );
    for (const order of expired.rows) {
      await client.query(
        "UPDATE orders SET status = 'cancelled', payment_status = 'failed', updated_at = NOW() WHERE id = $1 AND payment_status = 'pending'",
        [order.id]
      );
      await client.query(
        "UPDATE payment_attempts SET status = 'failed', updated_at = NOW() WHERE order_id = $1 AND status = 'pending'",
        [order.id]
      );
      for (const item of order.items) {
        await client.query("UPDATE products SET stock = stock + $1, updated_at = NOW() WHERE id = $2", [item.quantity, item.productId]);
      }
    }
    await client.query(
      "UPDATE manual_subscription_renewals SET status = 'failed' WHERE status = 'pending' AND expires_at <= NOW()"
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

app.get("/api/health", async (_req, res, next) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      status: "ok",
      emailConfigured: isEmailConfigured(),
      photoStorageConfigured: isStorageConfigured(),
      payments: getAvailablePaymentMethods().map(({ id, available }) => ({ id, available }))
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/csrf", (req, res) => {
  req.session.csrfToken ||= randomBytes(32).toString("hex");
  res.json({ csrfToken: req.session.csrfToken });
});

app.get("/api/auth/me", (req, res) => {
  res.json({ user: req.session.user || null });
});

app.post("/api/auth/register", authLimiter, async (req, res, next) => {
  try {
    if (!isEmailConfigured()) return res.status(503).json({ error: "Account email is not configured. Registration is temporarily unavailable." });
    const input = parseOrRespond(registrationSchema, req.body, res);
    if (!input) return;
    if (["farmer", "business"].includes(input.role) && (!input.farmName || !input.location)) {
      return res.status(400).json({ error: "Farm/business name and location are required for this account." });
    }
    const passwordHash = await bcrypt.hash(input.password, 12);
    const client = await pool.connect();
    let user;
    try {
      await client.query("BEGIN");
      const result = await client.query(
        "INSERT INTO users (email, password_hash, display_name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, role, created_at",
        [input.email, passwordHash, input.name, input.role]
      );
      user = result.rows[0];
      if (input.role === "farmer") {
        await client.query(
          "INSERT INTO farmer_profiles (user_id, farm_name, farmer_name, location) VALUES ($1, $2, $3, $4)",
          [user.id, input.farmName, input.name, input.location]
        );
      } else if (input.role === "business") {
        await client.query(
          "INSERT INTO business_profiles (user_id, business_name, contact_name, location) VALUES ($1, $2, $3, $4)",
          [user.id, input.farmName, input.name, input.location]
        );
      }
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      if (error.code === "23505") return res.status(409).json({ error: "An account with that email already exists." });
      throw error;
    } finally {
      client.release();
    }
    let emailSent = true;
    try {
      const token = await createAuthToken(user.id, "verify_email");
      await sendAccountEmail({
        to: user.email,
        subject: "Verify your Shamba Direct account",
        text: `Hello ${input.name},\n\nVerify your email within 24 hours:\n${appUrl("/verify-email", token)}\n\nIf you did not create this account, ignore this email.`
      });
    } catch (error) {
      console.error("New account verification email could not be sent.", error);
      emailSent = false;
    }
    res.status(201).json({
      emailSent,
      message: emailSent
        ? "Account created. Check your email to verify the address before signing in."
        : "Account created, but the verification email could not be sent. Use the resend verification option before signing in."
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/auth/verify", authLimiter, async (req, res, next) => {
  try {
    const token = z.string().min(20).max(200).safeParse(req.query.token);
    if (!token.success) return res.status(400).json({ error: "Verification link is invalid or expired." });
    const result = await pool.query(
      `UPDATE auth_tokens SET used_at = NOW()
       WHERE token_hash = $1 AND purpose = 'verify_email' AND used_at IS NULL AND expires_at > NOW()
       RETURNING user_id`,
      [hashToken(token.data)]
    );
    if (!result.rowCount) return res.status(400).json({ error: "Verification link is invalid or expired." });
    const verified = await pool.query(
      `UPDATE users SET email_verified_at = COALESCE(email_verified_at, NOW())
       WHERE id = $1 RETURNING id, email, role`,
      [result.rows[0].user_id]
    );
    const user = verified.rows[0];
    const profile = await pool.query("SELECT display_name FROM users WHERE id = $1", [user.id]);
    await new Promise((resolve, reject) => req.session.regenerate((error) => error ? reject(error) : resolve()));
    req.session.user = { id: user.id, email: user.email, role: user.role, name: profile.rows[0]?.display_name || user.email };
    req.session.csrfToken = randomBytes(32).toString("hex");
    res.json({ user: req.session.user, message: "Email verified." });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/verification/resend", authLimiter, async (req, res, next) => {
  try {
    if (!isEmailConfigured()) return res.status(503).json({ error: "Account email is not configured." });
    const input = parseOrRespond(z.object({ email: emailSchema }), req.body, res);
    if (!input) return;
    const result = await pool.query("SELECT id, email, email_verified_at FROM users WHERE email = $1", [input.email]);
    if (result.rowCount && !result.rows[0].email_verified_at) {
      const token = await createAuthToken(result.rows[0].id, "verify_email");
      await sendAccountEmail({
        to: result.rows[0].email,
        subject: "Verify your Shamba Direct account",
        text: `Verify your email within 24 hours:\n${appUrl("/verify-email", token)}`
      });
    }
    res.json({ message: "If that address needs verification, a link has been sent." });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/password-reset/request", authLimiter, async (req, res, next) => {
  try {
    if (!isEmailConfigured()) return res.status(503).json({ error: "Account email is not configured." });
    const input = parseOrRespond(z.object({ email: emailSchema }), req.body, res);
    if (!input) return;
    const result = await pool.query("SELECT id, email, email_verified_at FROM users WHERE email = $1", [input.email]);
    if (result.rowCount && result.rows[0].email_verified_at) {
      const token = await createAuthToken(result.rows[0].id, "reset_password");
      await sendAccountEmail({
        to: result.rows[0].email,
        subject: "Reset your Shamba Direct password",
        text: `This password reset link expires in one hour:\n${appUrl("/reset-password", token)}\n\nIf you did not request this, ignore this email.`
      });
    }
    res.json({ message: "If the verified account exists, password reset instructions have been sent." });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/password-reset/complete", authLimiter, async (req, res, next) => {
  try {
    const input = parseOrRespond(z.object({ token: z.string().min(20).max(200), password: passwordSchema }), req.body, res);
    if (!input) return;
    const passwordHash = await bcrypt.hash(input.password, 12);
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const token = await client.query(
        `UPDATE auth_tokens SET used_at = NOW()
         WHERE token_hash = $1 AND purpose = 'reset_password' AND used_at IS NULL AND expires_at > NOW()
         RETURNING user_id`,
        [hashToken(input.token)]
      );
      if (!token.rowCount) {
        await client.query("ROLLBACK");
        return res.status(400).json({ error: "Password reset link is invalid or expired." });
      }
      await client.query("UPDATE users SET password_hash = $2 WHERE id = $1", [token.rows[0].user_id, passwordHash]);
      await client.query("DELETE FROM user_sessions WHERE sess->'user'->>'id' = $1", [token.rows[0].user_id]);
      await client.query("COMMIT");
      res.json({ message: "Password reset successfully. Sign in with your new password." });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/login", authLimiter, async (req, res, next) => {
  try {
    const input = parseOrRespond(z.object({ email: emailSchema, password: z.string().min(1).max(128) }), req.body, res);
    if (!input) return;
    const result = await pool.query(
      `SELECT u.id, u.email, u.password_hash, u.role, u.email_verified_at,
              COALESCE(NULLIF(u.display_name, ''), f.farmer_name, b.business_name, u.email) AS name, u.stripe_customer_id
       FROM users u LEFT JOIN farmer_profiles f ON f.user_id = u.id
       LEFT JOIN business_profiles b ON b.user_id = u.id WHERE u.email = $1`,
      [input.email]
    );
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(input.password, user.password_hash))) {
      return res.status(401).json({ error: "Email or password is incorrect." });
    }
    if (!user.email_verified_at) return res.status(403).json({ error: "Verify your email before signing in. Use the resend verification link if needed." });
    await new Promise((resolve, reject) => req.session.regenerate((error) => error ? reject(error) : resolve()));
    req.session.user = { id: user.id, email: user.email, role: user.role, name: user.name, stripeCustomerId: user.stripe_customer_id };
    req.session.csrfToken = randomBytes(32).toString("hex");
    res.json({ user: req.session.user });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/logout", requireAuth, (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie("shamba.sid", { httpOnly: true, secure: production, sameSite: "lax" });
    res.status(204).end();
  });
});

app.get("/api/products", async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT p.id, p.farmer_id AS "farmerId", p.name, p.category, p.description, p.location,
              p.price_kes AS price, p.unit, p.stock, p.image_url AS "imageUrl", p.status,
              f.farm_name AS "farmName", f.farmer_name AS "farmerName", f.verified
       FROM products p JOIN farmer_profiles f ON f.user_id = p.farmer_id
       JOIN subscriptions s ON s.user_id = p.farmer_id
       WHERE p.status = 'active' AND f.verified = TRUE AND s.status = 'active'
         AND s.current_period_end > NOW()
       ORDER BY p.created_at DESC LIMIT 200`
    );
    res.json({ products: result.rows });
  } catch (error) {
    next(error);
  }
});

app.get("/api/farmers", async (_req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT f.user_id AS id, f.farm_name AS name, f.farmer_name AS farmer, f.location,
              f.story, f.practices, f.profile_photo_url AS "profilePhoto",
              f.cover_photo_url AS "coverPhoto", f.verified
       FROM farmer_profiles f
       WHERE f.verified = TRUE
       ORDER BY f.created_at DESC LIMIT 100`
    );
    res.json({ farmers: result.rows });
  } catch (error) {
    next(error);
  }
});

app.get("/api/farmers/me/products", requireAuth, requireRole("farmer"), async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT id, name, category, description, location, price_kes AS price, unit, stock,
              image_url AS "imageUrl", status
       FROM products WHERE farmer_id = $1 ORDER BY created_at DESC LIMIT 200`,
      [req.session.user.id]
    );
    res.json({ products: result.rows });
  } catch (error) {
    next(error);
  }
});

app.post("/api/uploads", requireAuth, uploadLimiter, async (req, res, next) => {
  try {
    if (!isStorageConfigured()) return res.status(503).json({ error: "Photo storage is not configured." });
    const input = parseOrRespond(z.object({
      purpose: z.enum(["profile", "cover", "product"]),
      contentType: z.enum(["image/jpeg", "image/png", "image/webp", "image/avif"]),
      size: z.number().int().positive().max(8 * 1024 * 1024)
    }), req.body, res);
    if (!input) return;
    if (input.purpose === "product" && req.session.user.role !== "farmer") return res.status(403).json({ error: "Only farmers can upload listing photos." });
    if (["profile", "cover"].includes(input.purpose) && req.session.user.role !== "farmer") return res.status(403).json({ error: "Only farmers can upload farm profile photos." });
    res.json(await createImageUpload({ userId: req.session.user.id, ...input }));
  } catch (error) {
    next(error);
  }
});

const productSchema = z.object({
  name: z.string().trim().min(2).max(100),
  category: z.string().trim().min(2).max(80),
  description: z.string().trim().min(5).max(1000),
  location: z.string().trim().min(2).max(100),
  price: z.number().int().positive().max(100000000),
  unit: z.string().trim().min(1).max(60),
  stock: z.number().int().min(0).max(1000000),
  imageUrl: z.string().url().max(2048)
});

app.post("/api/products", requireAuth, requireRole("farmer"), async (req, res, next) => {
  try {
    const input = parseOrRespond(productSchema, req.body, res);
    if (!input) return;
    if (!(await verifyUploadedImage(input.imageUrl, req.session.user.id, "product"))) return res.status(400).json({ error: "Upload the real product photo before creating the listing." });
    const subscription = await pool.query(
      "SELECT plan_id FROM subscriptions WHERE user_id = $1 AND status = 'active' AND current_period_end > NOW()",
      [req.session.user.id]
    );
    if (!subscription.rowCount) return res.status(403).json({ error: "An active farmer plan is required to publish listings." });
    const listingLimit = subscription.rows[0].plan_id === "premium" ? Infinity
      : subscription.rows[0].plan_id === "standard" ? 25 : 5;
    const count = await pool.query(
      "SELECT COUNT(*)::integer AS total FROM products WHERE farmer_id = $1 AND status IN ('active', 'pending')",
      [req.session.user.id]
    );
    if (count.rows[0].total >= listingLimit) return res.status(403).json({ error: "Your plan's active listing limit has been reached. Upgrade to add more listings." });
    const result = await pool.query(
      `INSERT INTO products (farmer_id, name, category, description, location, price_kes, unit, stock, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, name, category, description, location, price_kes AS price, unit, stock, image_url AS "imageUrl", status`,
      [req.session.user.id, input.name, input.category, input.description, input.location, input.price, input.unit, input.stock, input.imageUrl || null]
    );
    res.status(201).json({ product: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/products/:id", requireAuth, requireRole("farmer"), async (req, res, next) => {
  try {
    const input = parseOrRespond(productSchema.partial(), req.body, res);
    if (!input || Object.keys(input).length === 0) return res.status(400).json({ error: "Provide at least one product field to update." });
    if (input.imageUrl && !(await verifyUploadedImage(input.imageUrl, req.session.user.id, "product"))) return res.status(400).json({ error: "Upload the image before saving the listing." });
    const fields = { name: "name", category: "category", description: "description", location: "location", price: "price_kes", unit: "unit", stock: "stock", imageUrl: "image_url" };
    const values = Object.entries(input);
    const updates = values.map(([key], index) => `${fields[key]} = $${index + 2}`).join(", ");
    const result = await pool.query(
      `UPDATE products SET ${updates}, updated_at = NOW()
       WHERE id = $1 AND farmer_id = $${values.length + 2}
       RETURNING id, name, category, description, location, price_kes AS price, unit, stock, image_url AS "imageUrl", status`,
      [req.params.id, ...values.map(([, value]) => value), req.session.user.id]
    );
    if (!result.rowCount) return res.status(404).json({ error: "Listing not found." });
    res.json({ product: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/orders/:id/status", requireAuth, requireRole("farmer"), async (req, res, next) => {
  try {
    const input = parseOrRespond(z.object({ status: z.enum(["preparing", "on_the_way", "delivered"]) }), req.body, res);
    if (!input) return;
    const result = await pool.query(
      `UPDATE orders o SET status = $2, updated_at = NOW()
       WHERE o.id = $1 AND EXISTS (
         SELECT 1 FROM jsonb_array_elements(o.items) item WHERE item->>'farmerId' = $3
       ) AND (
         ($2 = 'preparing' AND o.status = 'received')
         OR ($2 = 'on_the_way' AND o.status = 'preparing')
         OR ($2 = 'delivered' AND o.status = 'on_the_way')
       ) AND (o.payment_status = 'paid' OR o.payment_method = 'cash_on_delivery')
       RETURNING id, status`,
      [req.params.id, input.status, req.session.user.id]
    );
    if (!result.rowCount) return res.status(409).json({ error: "Order not found or the status transition is not allowed." });
    res.json({ order: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

app.get("/api/farmers/me", requireAuth, requireRole("farmer"), async (req, res, next) => {
  try {
    const result = await pool.query("SELECT farm_name AS \"farmName\", farmer_name AS \"farmerName\", location, story, practices, profile_photo_url AS \"profilePhotoUrl\", cover_photo_url AS \"coverPhotoUrl\", verified FROM farmer_profiles WHERE user_id = $1", [req.session.user.id]);
    res.json({ profile: result.rows[0] || null });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/farmers/me", requireAuth, requireRole("farmer"), async (req, res, next) => {
  try {
    const input = parseOrRespond(z.object({
      farmName: z.string().trim().min(2).max(80),
      farmerName: z.string().trim().min(2).max(80),
      location: z.string().trim().min(2).max(100),
      story: z.string().trim().max(1000),
      practices: z.string().trim().max(120),
      profilePhotoUrl: z.string().url().max(2048),
      coverPhotoUrl: z.string().url().max(2048)
    }).partial(), req.body, res);
    if (!input || Object.keys(input).length === 0) return res.status(400).json({ error: "Provide profile fields to update." });
    if (input.profilePhotoUrl && !(await verifyUploadedImage(input.profilePhotoUrl, req.session.user.id, "profile"))) return res.status(400).json({ error: "Upload the profile photo before saving." });
    if (input.coverPhotoUrl && !(await verifyUploadedImage(input.coverPhotoUrl, req.session.user.id, "cover"))) return res.status(400).json({ error: "Upload the cover photo before saving." });
    const fields = {
      farmName: "farm_name", farmerName: "farmer_name", location: "location", story: "story",
      practices: "practices", profilePhotoUrl: "profile_photo_url", coverPhotoUrl: "cover_photo_url"
    };
    const values = Object.entries(input);
    const updates = values.map(([key], index) => `${fields[key]} = $${index + 2}`).join(", ");
    const result = await pool.query(
      `UPDATE farmer_profiles SET ${updates}, updated_at = NOW() WHERE user_id = $1
       RETURNING farm_name AS "farmName", farmer_name AS "farmerName", location, story, practices,
         profile_photo_url AS "profilePhotoUrl", cover_photo_url AS "coverPhotoUrl", verified`,
      [req.session.user.id, ...values.map(([, value]) => value)]
    );
    res.json({ profile: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

app.get("/api/subscriptions/me", requireAuth, async (req, res, next) => {
  try {
    const accountType = req.session.user.role === "farmer" ? "farmer"
      : req.session.user.role === "business" ? "business" : null;
    if (!accountType) return res.status(403).json({ error: "This account cannot manage a subscription." });
    const result = await pool.query(
      `SELECT account_type AS "accountType", plan_id AS "planId", status, provider,
              current_period_start AS "currentPeriodStart", current_period_end AS "currentPeriodEnd",
              cancel_at_period_end AS "cancelAtPeriodEnd"
       FROM subscriptions WHERE user_id = $1`,
      [req.session.user.id]
    );
    const subscription = result.rows[0] || null;
    if (subscription?.status === "active" && subscription.currentPeriodEnd && new Date(subscription.currentPeriodEnd) <= new Date()) {
      await pool.query("UPDATE subscriptions SET status = 'cancelled', updated_at = NOW() WHERE user_id = $1", [req.session.user.id]);
      subscription.status = "cancelled";
    }
    res.json({
      subscription,
      accountType,
      plans: subscriptionPlans[accountType]
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/subscriptions/checkout", requireAuth, paymentLimiter, async (req, res, next) => {
  try {
    const input = parseOrRespond(z.object({
      planId: z.string().min(3).max(30),
      paymentMethod: z.enum(["card", "mpesa"]),
      phone: z.string().trim().refine(isValidMpesaPhone, "Enter a valid Kenyan M-Pesa mobile number.").optional()
    }), req.body, res);
    if (!input) return;
    const accountType = req.session.user.role === "farmer" ? "farmer"
      : req.session.user.role === "business" ? "business" : null;
    if (!accountType) return res.status(403).json({ error: "This account cannot purchase a subscription." });
    const plan = subscriptionPlans[accountType].find((entry) => entry.id === input.planId);
    if (!plan) return res.status(400).json({ error: "Choose a valid plan for your account type." });
    const currentResult = await pool.query("SELECT status, stripe_subscription_id FROM subscriptions WHERE user_id = $1", [req.session.user.id]);
    if (currentResult.rows[0]?.status === "active") return res.status(409).json({ error: "Cancel your current plan before changing plans." });
    if (input.paymentMethod === "card") {
      if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) return res.status(503).json({ error: "Stripe recurring billing is not configured." });
      const checkout = await createStripeSubscriptionCheckout({
        userId: req.session.user.id,
        email: req.session.user.email,
        plan,
        accountType,
        customerId: (await pool.query("SELECT stripe_customer_id FROM users WHERE id = $1", [req.session.user.id])).rows[0]?.stripe_customer_id,
        successUrl: `${process.env.PUBLIC_APP_URL}/?subscription=success`,
        cancelUrl: `${process.env.PUBLIC_APP_URL}/?subscription=cancelled`
      });
      await pool.query(
        `INSERT INTO subscriptions (user_id, account_type, plan_id, status, provider, stripe_checkout_session_id)
         VALUES ($1, $2, $3, 'pending', 'stripe', $4)
         ON CONFLICT (user_id) DO UPDATE SET account_type = EXCLUDED.account_type, plan_id = EXCLUDED.plan_id,
           status = 'pending', provider = 'stripe', stripe_checkout_session_id = EXCLUDED.stripe_checkout_session_id,
           updated_at = NOW()`,
        [req.session.user.id, accountType, plan.id, checkout.id]
      );
      return res.json({ redirectUrl: checkout.url });
    }
    if (!getAvailablePaymentMethods().find((method) => method.id === "mpesa")?.available) {
      return res.status(503).json({ error: "M-Pesa is not configured for monthly renewal." });
    }
    if (!input.phone) return res.status(400).json({ error: "Enter the M-Pesa phone number to receive a payment prompt." });
    const client = await pool.connect();
    let renewal;
    try {
      await client.query("BEGIN");
      await client.query(
        `INSERT INTO subscriptions (user_id, account_type, plan_id, status, provider, current_period_start, current_period_end)
         VALUES ($1, $2, $3, 'pending', 'mpesa_manual', NULL, NULL)
         ON CONFLICT (user_id) DO UPDATE SET account_type = EXCLUDED.account_type, plan_id = EXCLUDED.plan_id,
           status = 'pending', provider = 'mpesa_manual', stripe_subscription_id = NULL,
           stripe_checkout_session_id = NULL, updated_at = NOW()`,
        [req.session.user.id, accountType, plan.id]
      );
      const created = await client.query(
        `INSERT INTO manual_subscription_renewals (user_id, plan_id, amount_kes, expires_at)
         VALUES ($1, $2, $3, NOW() + INTERVAL '15 minutes')
         RETURNING id, amount_kes AS amount`,
        [req.session.user.id, plan.id, plan.price]
      );
      renewal = created.rows[0];
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
    const payment = await createMpesaStkPush({ order: { id: renewal.id, total_kes: renewal.amount }, phone: input.phone });
    await pool.query("UPDATE manual_subscription_renewals SET checkout_request_id = $1 WHERE id = $2", [payment.checkoutRequestId, renewal.id]);
    res.json({ message: payment.customerMessage || "Approve the M-Pesa prompt. Renewals are manual and must be completed each month.", renewalId: renewal.id });
  } catch (error) {
    next(error);
  }
});

app.post("/api/subscriptions/cancel", requireAuth, async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT provider, stripe_subscription_id, status FROM subscriptions WHERE user_id = $1",
      [req.session.user.id]
    );
    const subscription = result.rows[0];
    if (!subscription || subscription.status !== "active") return res.status(404).json({ error: "No active subscription was found." });
    if (subscription.provider === "stripe") {
      const updated = await setStripeSubscriptionCancellation(subscription.stripe_subscription_id, true);
      await syncStripeSubscription(updated);
    } else {
      await pool.query("UPDATE subscriptions SET cancel_at_period_end = TRUE, updated_at = NOW() WHERE user_id = $1", [req.session.user.id]);
    }
    res.json({ message: "Cancellation scheduled for the end of the paid period." });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/orders", requireAuth, requireRole("admin"), async (_req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM orders ORDER BY created_at DESC LIMIT 200");
    res.json({ orders: result.rows });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/review", requireAuth, requireRole("admin"), async (_req, res, next) => {
  try {
    const [farmers, products] = await Promise.all([
      pool.query(
        `SELECT u.id, f.farm_name AS name, f.farmer_name AS farmer, f.location,
                f.story, f.practices, f.profile_photo_url AS "profilePhoto",
                f.cover_photo_url AS "coverPhoto", f.verified
         FROM farmer_profiles f JOIN users u ON u.id = f.user_id
         WHERE f.verified = FALSE ORDER BY f.created_at ASC LIMIT 100`
      ),
      pool.query(
        `SELECT p.id, p.farmer_id AS "farmerId", p.name, p.price_kes AS price, p.status,
                p.image_url AS "imageUrl", f.farm_name AS "farmName"
         FROM products p JOIN farmer_profiles f ON f.user_id = p.farmer_id
         WHERE p.status = 'pending' ORDER BY p.created_at ASC LIMIT 200`
      )
    ]);
    res.json({ farmers: farmers.rows, products: products.rows });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/orders/:id/payment", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const input = parseOrRespond(z.object({ status: z.enum(["paid", "failed"]) }), req.body, res);
    if (!input) return;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        `UPDATE orders SET payment_status = $2,
           status = CASE WHEN $2 = 'failed' THEN 'cancelled' ELSE status END, updated_at = NOW()
         WHERE id = $1 AND payment_method IN ('bank_transfer', 'cash_on_delivery')
           AND payment_status = 'awaiting_manual_confirmation'
         RETURNING id, items`,
        [req.params.id, input.status === "paid" ? "paid" : "failed"]
      );
      if (!result.rowCount) {
        await client.query("ROLLBACK");
        return res.status(404).json({ error: "Manual-payment order not found." });
      }
      await client.query(
        "UPDATE payment_attempts SET status = $2, updated_at = NOW() WHERE order_id = $1 AND provider IN ('bank_transfer', 'cash_on_delivery') AND status = 'pending'",
        [req.params.id, input.status]
      );
      if (input.status === "failed") {
        for (const item of result.rows[0].items) {
          await client.query("UPDATE products SET stock = stock + $1, updated_at = NOW() WHERE id = $2", [item.quantity, item.productId]);
        }
      }
      await client.query("COMMIT");
      res.json({ orderId: result.rows[0].id, paymentStatus: input.status });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    next(error);
  }
});

app.post("/api/payments/:orderId/cancel", requireAuth, async (req, res, next) => {
  try {
    const cancelled = await cancelPendingOrder(req.params.orderId, req.session.user.id);
    if (!cancelled) return res.status(404).json({ error: "Pending order not found." });
    res.json({ orderId: req.params.orderId, paymentStatus: "failed" });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/products/:id", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const input = parseOrRespond(z.object({ status: z.enum(["active", "rejected", "paused"]) }), req.body, res);
    if (!input) return;
    const result = await pool.query(
      `UPDATE products SET status = $2, updated_at = NOW()
       WHERE id = $1 AND ($2 <> 'active' OR EXISTS (
         SELECT 1 FROM farmer_profiles WHERE user_id = products.farmer_id AND verified = TRUE
       )) RETURNING id, status`,
      [req.params.id, input.status]
    );
    if (!result.rowCount) return res.status(404).json({ error: "Listing not found or farmer profile is not verified." });
    res.json({ product: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/admin/farmers/:id/verification", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const input = parseOrRespond(z.object({ verified: z.boolean() }), req.body, res);
    if (!input) return;
    const result = await pool.query(
      "UPDATE farmer_profiles SET verified = $2, updated_at = NOW() WHERE user_id = $1 RETURNING user_id AS id, verified",
      [req.params.id, input.verified]
    );
    if (!result.rowCount) return res.status(404).json({ error: "Farmer profile not found." });
    res.json({ farmer: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

app.get("/api/orders", requireAuth, async (req, res, next) => {
  try {
    const query = req.session.user.role === "farmer"
      ? `SELECT DISTINCT o.* FROM orders o CROSS JOIN LATERAL jsonb_array_elements(o.items) item
         WHERE item->>'farmerId' = $1 ORDER BY o.created_at DESC LIMIT 100`
      : "SELECT * FROM orders WHERE buyer_id = $1 ORDER BY created_at DESC LIMIT 100";
    const result = await pool.query(query, [req.session.user.id]);
    res.json({ orders: result.rows });
  } catch (error) {
    next(error);
  }
});

const orderSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^\+?[0-9\s()-]{9,18}$/),
  fulfillment: z.enum(["delivery", "pickup"]),
  area: z.string().trim().min(2).max(100),
  address: z.string().trim().max(200).default(""),
  deliveryDate: z.string().date().optional(),
  deliveryTime: z.string().trim().max(40).default("Any time"),
  paymentMethod: z.enum(["mpesa", "card", "bank_transfer", "cash_on_delivery"]),
  items: z.array(z.object({ productId: z.string().uuid(), quantity: z.number().int().positive().max(1000) }))
    .min(1).max(50).refine((items) => new Set(items.map((item) => item.productId)).size === items.length, "Each listing must appear only once."),
  paymentPhone: z.string().trim().refine(isValidMpesaPhone, "Enter a valid Kenyan M-Pesa mobile number.").optional()
});

app.post("/api/orders", requireAuth, requireRole("buyer"), paymentLimiter, async (req, res, next) => {
  const input = parseOrRespond(orderSchema, req.body, res);
  if (!input) return;
  const method = getAvailablePaymentMethods().find((entry) => entry.id === input.paymentMethod);
  if (!method?.available) return res.status(503).json({ error: "That payment method is not configured yet." });
  if (input.fulfillment === "delivery" && !input.address) return res.status(400).json({ error: "Enter a delivery address." });
  if (input.paymentMethod === "mpesa" && !input.paymentPhone) return res.status(400).json({ error: "Enter the phone number for the M-Pesa prompt." });

  const client = await pool.connect();
  let order;
  try {
    await client.query("BEGIN");
    const ids = input.items.map((item) => item.productId);
    const products = await client.query(
      `SELECT p.id, p.farmer_id AS "farmerId", p.name, p.price_kes AS price, p.unit, p.stock
       FROM products p JOIN farmer_profiles f ON f.user_id = p.farmer_id
       JOIN subscriptions s ON s.user_id = p.farmer_id
       WHERE p.id = ANY($1::uuid[]) AND p.status = 'active' AND f.verified = TRUE
         AND s.status = 'active' AND s.current_period_end > NOW()
       FOR UPDATE OF p`,
      [ids]
    );
    const byId = new Map(products.rows.map((product) => [product.id, product]));
    if (byId.size !== new Set(ids).size) {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: "One or more listings are no longer available." });
    }
    const items = input.items.map((item) => {
      const product = byId.get(item.productId);
      if (item.quantity > product.stock) throw Object.assign(new Error(`${product.name} does not have enough stock.`), { status: 409 });
      return { productId: product.id, farmerId: product.farmerId, name: product.name, unit: product.unit, price: product.price, quantity: item.quantity };
    });
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = input.fulfillment === "pickup" ? 0 : Number(process.env.DEFAULT_DELIVERY_FEE_KES || 500);
    if (!Number.isSafeInteger(deliveryFee) || deliveryFee < 0) throw new Error("DEFAULT_DELIVERY_FEE_KES must be a non-negative whole number.");
    const total = subtotal + deliveryFee;
    const paymentStatus = ["bank_transfer", "cash_on_delivery"].includes(input.paymentMethod) ? "awaiting_manual_confirmation" : "pending";
    const orderResult = await client.query(
      `INSERT INTO orders (buyer_id, payment_method, payment_status, fulfillment, delivery_name, delivery_phone, delivery_area, delivery_address, delivery_date, delivery_time, subtotal_kes, delivery_fee_kes, total_kes, items)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING id, status, payment_method AS "paymentMethod", payment_status AS "paymentStatus", fulfillment, delivery_area AS area, subtotal_kes AS subtotal, delivery_fee_kes AS "deliveryFee", total_kes AS total, items, created_at AS "createdAt"`,
      [req.session.user.id, input.paymentMethod, paymentStatus, input.fulfillment, input.name, input.phone, input.area, input.address, input.deliveryDate || null, input.deliveryTime, subtotal, deliveryFee, total, JSON.stringify(items)]
    );
    order = orderResult.rows[0];
    await client.query(
      "INSERT INTO payment_attempts (order_id, provider, status, amount_kes) VALUES ($1, $2, 'pending', $3)",
      [order.id, input.paymentMethod === "card" ? "stripe" : input.paymentMethod, total]
    );
    for (const item of items) {
      await client.query("UPDATE products SET stock = stock - $1, updated_at = NOW() WHERE id = $2", [item.quantity, item.productId]);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    if (error.status) return res.status(error.status).json({ error: error.message });
    return next(error);
  } finally {
    client.release();
  }

  try {
    if (input.paymentMethod === "card") {
      const session = await createStripeCheckout({
        order,
        email: req.session.user.email,
        successUrl: `${appOrigin}/?payment=success&order=${order.id}`,
        cancelUrl: `${appOrigin}/?payment=cancelled&order=${order.id}`
      });
      await pool.query("UPDATE payment_attempts SET provider_reference = $1 WHERE order_id = $2 AND provider = 'stripe' AND status = 'pending'", [session.id, order.id]);
      return res.status(201).json({ order, redirectUrl: session.url });
    }
    if (input.paymentMethod === "mpesa") {
      const stk = await createMpesaStkPush({ order, phone: input.paymentPhone });
      await pool.query("UPDATE payment_attempts SET provider_reference = $1 WHERE order_id = $2 AND provider = 'mpesa' AND status = 'pending'", [stk.checkoutRequestId, order.id]);
      return res.status(201).json({ order, payment: { status: "pending", message: stk.customerMessage || "Approve the M-Pesa prompt on your phone." } });
    }
    res.status(201).json({ order, payment: { status: "awaiting_manual_confirmation", instructions: method.instructions || "Pay the courier on delivery." } });
  } catch (error) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const failed = await client.query(
        "UPDATE orders SET status = 'cancelled', payment_status = 'failed', updated_at = NOW() WHERE id = $1 AND payment_status = 'pending' RETURNING items",
        [order.id]
      );
      if (failed.rowCount) {
        for (const item of failed.rows[0].items) {
          await client.query("UPDATE products SET stock = stock + $1, updated_at = NOW() WHERE id = $2", [item.quantity, item.productId]);
        }
        await client.query("UPDATE payment_attempts SET status = 'failed', updated_at = NOW() WHERE order_id = $1 AND status = 'pending'", [order.id]);
      }
      await client.query("COMMIT");
    } catch (restoreError) {
      await client.query("ROLLBACK");
      console.error("Could not release stock after payment setup failed.", restoreError);
    } finally {
      client.release();
    }
    next(error);
  }
});

app.get("/api/payments/methods", (_req, res) => {
  res.json({ methods: getAvailablePaymentMethods() });
});

app.post("/api/payments/mpesa/callback", async (req, res, next) => {
  try {
    const callback = req.body?.Body?.stkCallback;
    if (!callback?.CheckoutRequestID) return res.status(400).json({ error: "Invalid callback." });
    const result = await pool.query(
      "SELECT order_id, amount_kes FROM payment_attempts WHERE provider = 'mpesa' AND provider_reference = $1 AND status = 'pending'",
      [callback.CheckoutRequestID]
    );
    const renewal = result.rowCount ? null : await pool.query(
      `SELECT id, amount_kes FROM manual_subscription_renewals
       WHERE checkout_request_id = $1 AND status = 'pending' AND expires_at > NOW()`,
      [callback.CheckoutRequestID]
    );
    if (!result.rowCount && !renewal?.rowCount) return res.json({ received: true });
    const query = await queryMpesaStkStatus(callback.CheckoutRequestID);
    if (String(query.ResultCode) === "0") {
      const metadata = callback.CallbackMetadata?.Item || [];
      const paidAmount = metadata.find((item) => item.Name === "Amount")?.Value;
      const receiptNumber = metadata.find((item) => item.Name === "MpesaReceiptNumber")?.Value;
      const expectedAmount = result.rows[0]?.amount_kes ?? renewal.rows[0].amount_kes;
      if (Number(paidAmount) !== expectedAmount || typeof receiptNumber !== "string" || !receiptNumber) {
        console.error("M-Pesa transaction details did not match the pending payment.", { checkoutRequestId: callback.CheckoutRequestID });
        return res.status(400).json({ error: "Payment verification failed." });
      }
      if (result.rowCount) {
        await markOrderPaid(result.rows[0].order_id, "mpesa", callback.CheckoutRequestID);
        await pool.query("UPDATE orders SET payment_reference = $2 WHERE id = $1", [result.rows[0].order_id, receiptNumber]);
      } else {
        await completeManualSubscriptionRenewal(renewal.rows[0].id, receiptNumber);
      }
    } else if (String(query.ResultCode) !== "1037" && String(query.ResultCode) !== "4999") {
      if (!result.rowCount) {
        await pool.query("UPDATE manual_subscription_renewals SET status = 'failed' WHERE id = $1 AND status = 'pending'", [renewal.rows[0].id]);
        return res.json({ received: true });
      }
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const failed = await client.query(
          "UPDATE orders SET status = 'cancelled', payment_status = 'failed', updated_at = NOW() WHERE id = $1 AND payment_status = 'pending' RETURNING items",
          [result.rows[0].order_id]
        );
        if (failed.rowCount) {
          for (const item of failed.rows[0].items) {
            await client.query("UPDATE products SET stock = stock + $1, updated_at = NOW() WHERE id = $2", [item.quantity, item.productId]);
          }
          await client.query("UPDATE payment_attempts SET status = 'failed', updated_at = NOW() WHERE provider = 'mpesa' AND provider_reference = $1 AND status = 'pending'", [callback.CheckoutRequestID]);
        }
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    }
    res.json({ received: true });
  } catch (error) {
    next(error);
  }
});

app.get("/api/payments/mpesa/status/:orderId", requireAuth, async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT o.id, o.payment_status, a.provider_reference, a.amount_kes FROM orders o
       JOIN payment_attempts a ON a.order_id = o.id AND a.provider = 'mpesa'
       WHERE o.id = $1 AND (o.buyer_id = $2 OR $3 = 'admin')`,
      [req.params.orderId, req.session.user.id, req.session.user.role]
    );
    if (!result.rowCount) return res.status(404).json({ error: "Order not found." });
    const payment = result.rows[0];
    if (payment.payment_status === "pending" && payment.provider_reference) {
      const status = await queryMpesaStkStatus(payment.provider_reference);
      if (String(status.ResultCode) === "0") {
        await markOrderPaid(payment.id, "mpesa", payment.provider_reference);
      }
    }
    const updated = await pool.query("SELECT payment_status FROM orders WHERE id = $1", [payment.id]);
    res.json({ orderId: payment.id, paymentStatus: updated.rows[0].payment_status });
  } catch (error) {
    next(error);
  }
});

app.get("/api/subscriptions/mpesa-renewals/:renewalId", requireAuth, async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT id, user_id, amount_kes, checkout_request_id, status FROM manual_subscription_renewals
       WHERE id = $1 AND user_id = $2`,
      [req.params.renewalId, req.session.user.id]
    );
    if (!result.rowCount) return res.status(404).json({ error: "Renewal request not found." });
    const renewal = result.rows[0];
    if (renewal.status === "pending" && renewal.checkout_request_id) {
      const status = await queryMpesaStkStatus(renewal.checkout_request_id);
      if (String(status.ResultCode) === "0") {
        await completeManualSubscriptionRenewal(renewal.id, null);
      }
    }
    const updated = await pool.query("SELECT status FROM manual_subscription_renewals WHERE id = $1", [renewal.id]);
    res.json({ renewalId: renewal.id, status: updated.rows[0].status });
  } catch (error) {
    next(error);
  }
});

app.get("/", (_req, res, next) => {
  res.sendFile(path.join(publicRoot, "index.html"), (error) => error && next(error));
});
app.get("/app.js", (_req, res, next) => {
  res.sendFile(path.join(publicRoot, "app.js"), (error) => error && next(error));
});
app.get("/styles.css", (_req, res, next) => {
  res.sendFile(path.join(publicRoot, "styles.css"), (error) => error && next(error));
});
app.get("/terms", (_req, res, next) => {
  res.sendFile(path.join(publicRoot, "terms.html"), (error) => error && next(error));
});
app.get("/privacy", (_req, res, next) => {
  res.sendFile(path.join(publicRoot, "privacy.html"), (error) => error && next(error));
});
app.get("/api-config.js", (_req, res, next) => {
  res.type("application/javascript").send(`window.SHAMBA_API_BASE = "/api"; window.SHAMBA_LIVE_ONLY = true;`);
});
app.use("/assets", express.static(path.join(publicRoot, "assets"), { dotfiles: "deny", index: false }));
app.get("*", (_req, res, next) => {
  if (_req.path.startsWith("/api/")) return res.status(404).json({ error: "API route not found." });
  res.sendFile(path.join(publicRoot, "index.html"), (error) => error && next(error));
});

app.use((error, _req, res, _next) => {
  const status = Number(error.status || 500);
  if (status >= 500) console.error("Request failed.", error);
  res.status(status).json({ error: status >= 500 ? "The request could not be completed. Please try again." : error.message });
});

await initializeDatabase();
const server = app.listen(port, () => console.log(`Shamba Direct API listening on port ${port}.`));
const paymentExpiryTimer = setInterval(() => {
  expirePendingPayments().catch((error) => console.error("Could not expire pending payments.", error));
}, 5 * 60 * 1000);

async function shutdown() {
  clearInterval(paymentExpiryTimer);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
