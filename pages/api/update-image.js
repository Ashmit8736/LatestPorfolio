import { prisma } from '../../lib/prisma'

export default async function handler(req, res) {
  try {
    await prisma.profile.updateMany({
      data: {
        profileImage: 'https://github.com/ashmit8736.png'
      }
    });
    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
