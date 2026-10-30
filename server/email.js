export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM && process.env.PUBLIC_APP_URL);
}

export async function sendAccountEmail({ to, subject, text }) {
  if (!isEmailConfigured()) throw new Error("Account email is not configured.");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ from: process.env.EMAIL_FROM, to: [to], subject, text })
  });
  if (!response.ok) {
    const body = await response.text();
    console.error("Email provider request failed.", { status: response.status, response: body.slice(0, 500) });
    throw new Error("Could not send account email. Please try again later.");
  }
}
