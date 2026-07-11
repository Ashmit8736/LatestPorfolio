import { prisma } from '../../lib/prisma'

export default async function handler(req, res) {
  try {
    const data = await prisma.profile.findFirst()
    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: error.stack,
      cause: error.cause ? String(error.cause) : null
    })
  }
}
