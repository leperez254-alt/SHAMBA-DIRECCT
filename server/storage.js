import { randomUUID } from "node:crypto";
import { HeadObjectCommand, S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const imageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"]
]);

function getClientConfig() {
  const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_BASE_URL } = process.env;
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME || !R2_PUBLIC_BASE_URL) return null;
  let publicUrl;
  try {
    publicUrl = new URL(R2_PUBLIC_BASE_URL);
  } catch {
    throw new Error("R2_PUBLIC_BASE_URL must be a valid HTTPS URL.");
  }
  if (publicUrl.protocol !== "https:" || publicUrl.username || publicUrl.password || publicUrl.search || publicUrl.hash) {
    throw new Error("R2_PUBLIC_BASE_URL must be an HTTPS URL without credentials, query, or fragment.");
  }
  return {
    bucket: R2_BUCKET_NAME,
    publicBase: publicUrl.toString().replace(/\/+$/, ""),
    client: new S3Client({
      region: "auto",
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY }
    })
  };
}

export function isStorageConfigured() {
  return Boolean(getClientConfig());
}

export async function createImageUpload({ userId, contentType, size, purpose }) {
  const config = getClientConfig();
  if (!config) throw new Error("Photo storage is not configured.");
  if (!imageTypes.has(contentType)) throw new Error("Upload a JPEG, PNG, WebP, or AVIF image.");
  if (!Number.isInteger(size) || size < 1 || size > 8 * 1024 * 1024) throw new Error("Images must be smaller than 8 MB.");
  if (!["profile", "cover", "product"].includes(purpose)) throw new Error("Select a valid image purpose.");

  const key = `users/${userId}/${purpose}/${randomUUID()}.${imageTypes.get(contentType)}`;
  const command = new PutObjectCommand({
    Bucket: config.bucket,
    Key: key,
    ContentType: contentType,
    ContentLength: size,
    Metadata: { owner: userId, purpose }
  });
  const uploadUrl = await getSignedUrl(config.client, command, {
    expiresIn: 300,
    signableHeaders: new Set(["content-type"]),
    unhoistableHeaders: new Set(["x-amz-meta-owner", "x-amz-meta-purpose"])
  });
  return {
    uploadUrl,
    imageUrl: `${config.publicBase}/${key}`,
    headers: {
      "Content-Type": contentType,
      "x-amz-meta-owner": userId,
      "x-amz-meta-purpose": purpose
    }
  };
}

export async function verifyUploadedImage(url, userId, purpose) {
  const config = getClientConfig();
  if (!config || typeof url !== "string") return false;
  let parsed;
  const base = new URL(config.publicBase);
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  const keyPrefix = `${base.pathname.replace(/\/+$/, "")}/users/${userId}/${purpose}/`;
  if (parsed.origin !== base.origin || parsed.search || parsed.hash || !parsed.pathname.startsWith(keyPrefix)) return false;
  try {
    const key = decodeURIComponent(parsed.pathname.slice(base.pathname.replace(/\/+$/, "").length + 1));
    const object = await config.client.send(new HeadObjectCommand({ Bucket: config.bucket, Key: key }));
    return object.Metadata?.owner === userId
      && object.Metadata?.purpose === purpose
      && object.ContentLength > 0
      && object.ContentLength <= 8 * 1024 * 1024
      && imageTypes.has(object.ContentType);
  } catch (error) {
    if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) return false;
    throw error;
  }
}
