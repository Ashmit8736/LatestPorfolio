import { clearAuthCookie } from '../../../lib/auth';
import { successResponse } from '../../../lib/apiResponse';

export default function handler(req, res) {
  clearAuthCookie(res);
  return successResponse(res, null, 'Logged out successfully');
}
