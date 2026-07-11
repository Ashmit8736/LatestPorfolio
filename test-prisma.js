import { PrismaClient } from './generated/prisma/client.js'
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})
prisma.$connect()
  .then(() => console.log('Connected natively!'))
  .catch(e => console.error('Error:', e))
  .finally(() => prisma.$disconnect())
