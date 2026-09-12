import { prisma } from '../../../lib/prisma';
import { getUserFromRequest } from '../../../lib/auth';
import { successResponse, errorResponse } from '../../../lib/apiResponse';
import { validateProfile } from '../../../lib/validations';

// Profile photos are stored inline as base64 data URIs (see lib/clientImage.js),
// so the default 1mb body limit isn't enough.
export const config = {
  api: {
    bodyParser: { sizeLimit: '4mb' },
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let profile = await prisma.profile.findFirst();
      if (!profile) profile = {}; 
      return successResponse(res, profile);
    } catch (error) {
      return errorResponse(res, 'Failed to fetch profile', 500, error.message);
    }
  }

  if (req.method === 'PUT') {
    const user = getUserFromRequest(req);
    if (!user) return errorResponse(res, 'Unauthorized', 401);

    const validationError = validateProfile(req.body);
    if (validationError) return errorResponse(res, validationError, 400);

    try {
      let profile = await prisma.profile.findFirst();
      if (profile) {
        profile = await prisma.profile.update({
          where: { id: profile.id },
          data: req.body
        });
      } else {
        profile = await prisma.profile.create({ data: req.body });
      }
      return successResponse(res, profile, 'Profile updated');
    } catch (error) {
      return errorResponse(res, 'Failed to update profile', 500, error.message);
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
