const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function update() {
  await prisma.profile.updateMany({
    data: {
      profileImage: 'https://github.com/ashmit8736.png'
    }
  });
  console.log('Updated profile image');
}

update()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
