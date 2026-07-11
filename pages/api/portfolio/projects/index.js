import { prisma } from '../../../../lib/prisma';
import { getUserFromRequest } from '../../../../lib/auth';
import { successResponse, errorResponse } from '../../../../lib/apiResponse';
import { validateProject } from '../../../../lib/validations';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
      return successResponse(res, data);
    } catch (error) {
      return errorResponse(res, 'Failed to fetch', 500, error.message);
    }
  }

  if (req.method === 'POST') {
    const user = getUserFromRequest(req);
    if (!user) return errorResponse(res, 'Unauthorized', 401);

    const validationError = validateProject(req.body);
    if (validationError) return errorResponse(res, validationError, 400);

    try {
      const data = await prisma.project.create({ data: req.body });
      return successResponse(res, data, 'Created successfully', 201);
    } catch (error) {
      return errorResponse(res, 'Failed to create', 500, error.message);
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
