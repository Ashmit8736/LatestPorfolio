export default function handler(req, res) {
  // Get IP from Vercel headers, proxy headers, or socket
  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  
  // Clean up the IP if it's a list (x-forwarded-for can be a comma-separated list)
  const clientIp = ip ? ip.split(',')[0].trim() : '';

  // Allowed IPs ONLY from environment
  const allowedIpsStr = process.env.ADMIN_ALLOWED_IPS || '';
  const allowedIps = allowedIpsStr.split(',').map(i => i.trim()).filter(i => i);

  // Check if client IP is in the allowed list
  const isAllowed = allowedIps.includes(clientIp);

  res.status(200).json({ allowed: isAllowed, ip: clientIp });
}
