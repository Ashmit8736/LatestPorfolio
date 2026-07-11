const { PrismaClient } = require('./generated/prisma/client.js');
const { PrismaTiDBCloud } = require('@tidbcloud/prisma-adapter');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
  const connectionString = 'mysql://3p9oeG43eC53TLM.root:j2YZhIzbjFzQW1YB@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio?sslaccept=strict';
  const adapter = new PrismaTiDBCloud({ url: connectionString });
  const prisma = new PrismaClient({ adapter });

  let user = await prisma.adminUser.findFirst();
  if (!user) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    user = await prisma.adminUser.create({
      data: {
        email: 'admin@portfolio.com',
        password: hashedPassword
      }
    });
    console.log('Created default admin: admin@portfolio.com / admin123');
  } else {
    console.log('Admin already exists:', user.email);
  }
}
seedAdmin().catch(console.error);
