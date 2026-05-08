// Simple in-memory rate limiter — max 5 scores per IP per hour
// Note: resets on each cold start, sufficient for abuse protection at current scale
const rateLimit = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  const entry = rateLimit.get(ip);

  // Reset window if expired
  if (now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  // Over limit
  if (entry.count >= maxRequests) return true;

  entry.count++;
  return false;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limit check
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress || "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests — please try again in an hour." });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
