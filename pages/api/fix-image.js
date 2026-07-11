import { prisma } from '../../lib/prisma'

export default async function handler(req, res) {
  try {
    await prisma.profile.updateMany({
      data: {
        profileImage: '/profile.jpg'
      }
    });
    res.status(200).json({ success: true, message: 'profileImage set to /profile.jpg' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
