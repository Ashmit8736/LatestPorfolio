import { prisma } from '../../lib/prisma'

export default async function handler(req, res) {
  try {
    await prisma.$executeRawUnsafe("SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));");
    res.status(200).json({ success: true, message: 'GLOBAL sql_mode changed' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
