import { prisma } from '../../../../lib/prisma';
import { getUserFromRequest } from '../../../../lib/auth';
import { successResponse, errorResponse } from '../../../../lib/apiResponse';

export default async function handler(req, res) {
  const { id } = req.query;
  const numId = parseInt(id);

  if (req.method === 'GET') {
    try {
      const data = await prisma.skill.findUnique({ where: { id: numId } });
      if (!data) return errorResponse(res, 'Not found', 404);
      return successResponse(res, data);
    } catch (error) {
      return errorResponse(res, 'Failed to fetch', 500, error.message);
    }
  }

  const user = getUserFromRequest(req);
  if (!user) return errorResponse(res, 'Unauthorized', 401);

  if (req.method === 'PUT') {
    try {
      const data = await prisma.skill.update({
        where: { id: numId },
        data: req.body
      });
      return successResponse(res, data, 'Updated successfully');
    } catch (error) {
      return errorResponse(res, 'Failed to update', 500, error.message);
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.skill.delete({ where: { id: numId } });
      return successResponse(res, null, 'Deleted successfully');
    } catch (error) {
      return errorResponse(res, 'Failed to delete', 500, error.message);
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
