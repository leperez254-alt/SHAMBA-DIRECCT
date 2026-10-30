import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

function getMpesaConfig() {
  const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE, MPESA_PASSKEY, MPESA_CALLBACK_URL } = process.env;
  if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET || !MPESA_SHORTCODE || !MPESA_PASSKEY || !MPESA_CALLBACK_URL) {
    return null;
  }
  const host = process.env.MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";
  return { host, shortcode: MPESA_SHORTCODE, passkey: MPESA_PASSKEY, callbackUrl: MPESA_CALLBACK_URL };
}

export function getAvailablePaymentMethods() {
  const stripeReady = Boolean(stripe && process.env.STRIPE_WEBHOOK_SECRET);
  return [
    { id: "mpesa", label: "M-Pesa", available: Boolean(getMpesaConfig()) },
    { id: "card", label: "Debit or credit card", available: stripeReady },
    { id: "bank_transfer", label: "Bank transfer", available: Boolean(process.env.BANK_TRANSFER_INSTRUCTIONS), instructions: process.env.BANK_TRANSFER_INSTRUCTIONS || undefined },
    { id: "cash_on_delivery", label: "Cash on delivery", available: process.env.ENABLE_CASH_ON_DELIVERY === "true" }
  ];
}

export async function createStripeCheckout({ order, email, successUrl, cancelUrl }) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) throw new Error("Card payments are not configured.");
  return stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    client_reference_id: order.id,
    metadata: { orderId: order.id },
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "kes",
        unit_amount: order.total_kes * 100,
        product_data: { name: `Shamba Direct order ${order.id}` }
      }
    }]
  });
}

export async function createStripeSubscriptionCheckout({ userId, email, plan, accountType, successUrl, cancelUrl, customerId }) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) throw new Error("Card subscription billing is not configured.");
  return stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId || undefined,
    customer_email: customerId ? undefined : email,
    client_reference_id: userId,
    metadata: { userId, planId: plan.id, accountType },
    subscription_data: { metadata: { userId, planId: plan.id, accountType } },
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "kes",
        unit_amount: plan.price * 100,
        recurring: { interval: "month" },
        product_data: { name: `Shamba Direct ${plan.name} plan` }
      }
    }]
  });
}

export async function setStripeSubscriptionCancellation(subscriptionId, cancelAtPeriodEnd) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) throw new Error("Card subscription billing is not configured.");
  return stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: cancelAtPeriodEnd });
}

export async function getStripeSubscription(subscriptionId) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) throw new Error("Card subscription billing is not configured.");
  return stripe.subscriptions.retrieve(subscriptionId);
}

async function getMpesaAccessToken(config) {
  const credentials = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString("base64");
  const response = await fetch(`${config.host}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` }
  });
  const result = await response.json();
  if (!response.ok || !result.access_token) throw new Error("M-Pesa authentication failed.");
  return result.access_token;
}

function mpesaTimestamp() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(new Date());
  const date = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${date.year}${date.month}${date.day}${date.hour}${date.minute}${date.second}`;
}

export function normalizeMpesaPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (/^0[17]\d{8}$/.test(digits)) return `254${digits.slice(1)}`;
  if (/^254[17]\d{8}$/.test(digits)) return digits;
  throw new Error("Enter a valid Kenyan M-Pesa mobile number.");
}

export function isValidMpesaPhone(phone) {
  if (typeof phone !== "string" || !/^[+()\s\d-]+$/.test(phone)) return false;
  const digits = phone.replace(/\D/g, "");
  return /^0[17]\d{8}$/.test(digits) || /^254[17]\d{8}$/.test(digits);
}

export async function createMpesaStkPush({ order, phone }) {
  const config = getMpesaConfig();
  if (!config) throw new Error("M-Pesa is not configured.");
  const timestamp = mpesaTimestamp();
  const password = Buffer.from(`${config.shortcode}${config.passkey}${timestamp}`).toString("base64");
  const token = await getMpesaAccessToken(config);
  const normalizedPhone = normalizeMpesaPhone(phone);
  const response = await fetch(`${config.host}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      BusinessShortCode: config.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: order.total_kes,
      PartyA: normalizedPhone,
      PartyB: config.shortcode,
      PhoneNumber: normalizedPhone,
      CallBackURL: config.callbackUrl,
      AccountReference: order.id.slice(0, 12),
      TransactionDesc: "Shamba Direct produce order"
    })
  });
  const result = await response.json();
  if (!response.ok || result.ResponseCode !== "0" || !result.CheckoutRequestID) {
    throw new Error("M-Pesa could not start the payment request.");
  }
  return { checkoutRequestId: result.CheckoutRequestID, customerMessage: result.CustomerMessage };
}

export async function queryMpesaStkStatus(checkoutRequestId) {
  const config = getMpesaConfig();
  if (!config) throw new Error("M-Pesa is not configured.");
  const timestamp = mpesaTimestamp();
  const password = Buffer.from(`${config.shortcode}${config.passkey}${timestamp}`).toString("base64");
  const token = await getMpesaAccessToken(config);
  const response = await fetch(`${config.host}/mpesa/stkpushquery/v1/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      BusinessShortCode: config.shortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId
    })
  });
  const result = await response.json();
  if (!response.ok) throw new Error("Could not verify the M-Pesa payment.");
  return result;
}

export function verifyStripeWebhook(rawBody, signature) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) throw new Error("Stripe webhook is not configured.");
  return stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
}
