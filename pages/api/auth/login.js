import bcrypt from 'bcryptjs';
import { prisma } from '../../../lib/prisma';
import { signToken, setAuthCookie } from '../../../lib/auth';
import { successResponse, errorResponse } from '../../../lib/apiResponse';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  try {
    const { email, password } = req.body;
    if (!email || !password) return errorResponse(res, 'Email and password are required', 400);

    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user) return errorResponse(res, 'Invalid credentials', 401);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return errorResponse(res, 'Invalid credentials', 401);

    const token = signToken({ id: user.id, email: user.email });
    setAuthCookie(res, token);

    return successResponse(res, { email: user.email }, 'Logged in successfully');
  } catch (error) {
    return errorResponse(res, 'Internal Server Error', 500, error.message);
  }
}
