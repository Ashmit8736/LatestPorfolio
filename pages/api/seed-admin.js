import { prisma } from '../../lib/prisma'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  try {
    let user = await prisma.adminUser.findFirst()
    if (!user) {
      const hashedPassword = await bcrypt.hash('admin123', 10)
      user = await prisma.adminUser.create({
        data: {
          email: 'admin@portfolio.com',
          password: hashedPassword
        }
      })
      res.status(200).json({ success: true, message: 'Created default admin: admin@portfolio.com / admin123' })
    } else {
      res.status(200).json({ success: true, message: `Admin already exists: ${user.email}` })
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
