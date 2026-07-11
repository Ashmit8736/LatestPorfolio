import 'dotenv/config'
import * as mariadb from 'mariadb'

async function testConnection() {
  const url = new URL(process.env.DATABASE_URL)
  const pool = mariadb.createPool({
    host: url.hostname,
    port: url.port ? parseInt(url.port) : 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1),
    ssl: {
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2'
    },
    connectionLimit: 1
  })

  try {
    const conn = await pool.getConnection()
    console.log('Successfully connected to TiDB via MariaDB driver!')
    const rows = await conn.query('SELECT 1 as val')
    console.log('Query result:', rows)
    conn.release()
  } catch (err) {
    console.error('Connection error:', err)
  } finally {
    pool.end()
  }
}

testConnection()
