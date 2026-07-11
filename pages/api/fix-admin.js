import { prisma } from '../../lib/prisma'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  try {
    const hash = await bcrypt.hash('Ashmit8736@', 10);
    
    // Find first user
    const users = await prisma.adminUser.findMany();
    
    if (users.length > 0) {
      await prisma.adminUser.update({
        where: { id: users[0].id },
        data: {
          email: 'ashmit8736@gmail.com',
          password: hash
        }
      });
      res.status(200).json({ success: true, message: 'Updated existing admin user credentials' });
    } else {
      await prisma.adminUser.create({
        data: {
          email: 'ashmit8736@gmail.com',
          password: hash
        }
      });
      res.status(200).json({ success: true, message: 'Created new admin user' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
