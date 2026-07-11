import { PrismaClient } from '../generated/prisma/client'
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter'

const globalForPrisma = global

if (!globalForPrisma.prisma) {
  const connectionString = 'mysql://3p9oeG43eC53TLM.root:j2YZhIzbjFzQW1YB@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio?sslaccept=strict'
  const adapter = new PrismaTiDBCloud({ url: connectionString })
  globalForPrisma.prisma = new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma

