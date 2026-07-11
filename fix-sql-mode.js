import { prisma } from './lib/prisma.js';

async function fixSqlMode() {
  try {
    console.log('Attempting to change GLOBAL sql_mode on TiDB...');
    await prisma.$executeRawUnsafe("SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));");
    console.log('Successfully changed GLOBAL sql_mode!');
  } catch (err) {
    console.error('Failed to change GLOBAL sql_mode:', err.message);
    try {
      console.log('Attempting to change SESSION sql_mode on TiDB...');
      await prisma.$executeRawUnsafe("SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));");
      console.log('Successfully changed SESSION sql_mode!');
    } catch (e2) {
      console.error('Failed to change SESSION sql_mode:', e2.message);
    }
  } finally {
    process.exit(0);
  }
}

fixSqlMode();
