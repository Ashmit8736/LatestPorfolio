export default function handler(req, res) {
  // Get IP from headers (if behind proxy/vercel) or socket
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  
  // Clean up the IP if it's a list (x-forwarded-for can be a comma-separated list)
  const clientIp = ip ? ip.split(',')[0].trim() : '';

  // Allowed IPs from environment, or fallback to the hardcoded list provided by user (plus localhost for dev)
  const allowedIpsStr = process.env.ADMIN_ALLOWED_IPS || '2409:4050:e84:1a5f:d1a9:7e12:3cce:3b2f,157.37.149.45,::1,127.0.0.1';
  const allowedIps = allowedIpsStr.split(',').map(i => i.trim());

  // Check if client IP is in the allowed list
  const isAllowed = allowedIps.includes(clientIp);

  res.status(200).json({ allowed: isAllowed, ip: clientIp });
}
