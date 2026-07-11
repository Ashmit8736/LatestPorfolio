import { prisma } from '../../lib/prisma'

export default async function handler(req, res) {
  try {
    await prisma.profile.updateMany({
      data: {
        about: "I am a Full Stack Web Developer with experience in building real-world web applications and e-commerce platforms using React.js, Node.js, Express.js, MongoDB, and MySQL. I enjoy developing responsive user interfaces, creating RESTful APIs, implementing authentication, and managing databases. I also have experience with CRUD operations, API testing, debugging, and improving application performance and user experience."
      }
    });
    res.status(200).json({ success: true, message: 'Profile about updated' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
