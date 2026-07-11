import { getUserFromRequest } from '../../../lib/auth';
import { successResponse, errorResponse } from '../../../lib/apiResponse';

export default function handler(req, res) {
  const user = getUserFromRequest(req);
  if (!user) return errorResponse(res, 'Not authenticated', 401);
  return successResponse(res, { user });
}
