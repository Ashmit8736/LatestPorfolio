import { prisma } from '../../../lib/prisma';
import { getUserFromRequest } from '../../../lib/auth';
import { successResponse, errorResponse } from '../../../lib/apiResponse';
import { validateServiceDetail } from '../../../lib/validations';

// This record can carry a main photo/video plus two card images, all stored
// inline as base64 data URIs (see lib/clientImage.js) — well past the default
// 1mb body limit, so we raise it as close to Vercel's own ~4.5mb request cap
// as Next's config allows.
export const config = {
  api: {
    bodyParser: { sizeLimit: '4.5mb' },
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let detail = await prisma.serviceDetail.findFirst();
      if (!detail) detail = {};
      return successResponse(res, detail);
    } catch (error) {
      return errorResponse(res, 'Failed to fetch', 500, error.message);
    }
  }

  if (req.method === 'PUT') {
    const user = getUserFromRequest(req);
    if (!user) return errorResponse(res, 'Unauthorized', 401);

    const validationError = validateServiceDetail(req.body);
    if (validationError) return errorResponse(res, validationError, 400);

    try {
      let detail = await prisma.serviceDetail.findFirst();
      if (detail) {
        detail = await prisma.serviceDetail.update({ where: { id: detail.id }, data: req.body });
      } else {
        detail = await prisma.serviceDetail.create({ data: req.body });
      }
      return successResponse(res, detail, 'Updated successfully');
    } catch (error) {
      return errorResponse(res, 'Failed to update', 500, error.message);
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
