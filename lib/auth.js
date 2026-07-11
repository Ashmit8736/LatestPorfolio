import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function setAuthCookie(res, token) {
  const cookieStr = `auth_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
  res.setHeader('Set-Cookie', cookieStr);
}

export function clearAuthCookie(res) {
  const cookieStr = `auth_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
  res.setHeader('Set-Cookie', cookieStr);
}

export function getUserFromRequest(req) {
  // Use Next.js built-in req.cookies if available, otherwise fallback to basic parse
  let token = req.cookies?.auth_token;
  
  if (!token && req.headers.cookie) {
    const cookies = req.headers.cookie.split(';').reduce((acc, curr) => {
      const [key, value] = curr.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});
    token = cookies.auth_token;
  }
  
  if (!token) return null;
  return verifyToken(token);
}
