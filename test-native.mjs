import { PrismaClient } from './generated/prisma/client.js'

const prisma = new PrismaClient()

prisma.$connect()
  .then(() => {
    console.log('NATIVE PRISMA CONNECTED SUCCESSFULLY!')
    return prisma.$disconnect()
  })
  .catch(e => {
    console.error('NATIVE PRISMA CONNECTION ERROR:', e)
  })
