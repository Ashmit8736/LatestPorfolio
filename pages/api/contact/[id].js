import { prisma } from '../../../lib/prisma';
import { getUserFromRequest } from '../../../lib/auth';
import { successResponse, errorResponse } from '../../../lib/apiResponse';

export default async function handler(req, res) {
  const user = getUserFromRequest(req);
  if (!user) return errorResponse(res, 'Unauthorized', 401);

  const { id } = req.query;
  const numId = parseInt(id);

  if (req.method === 'DELETE') {
    try {
      await prisma.contactMessage.delete({ where: { id: numId } });
      return successResponse(res, null, 'Deleted successfully');
    } catch (error) {
      return errorResponse(res, 'Failed to delete', 500, error.message);
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
