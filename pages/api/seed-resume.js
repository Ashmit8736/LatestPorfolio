import { prisma } from '../../lib/prisma'

export default async function handler(req, res) {
  try {
    // 1. Profile
    let profile = await prisma.profile.findFirst();
    const profileData = {
      fullName: 'Ashmit Singh',
      headline: 'MERN Full Stack Developer',
      shortBio: 'B.Tech IT graduate with practical experience in MERN stack development, SQL, and Manual Testing.',
      about: 'Worked on real-world web applications and e-commerce platforms using React.js, Node.js, Express.js, MongoDB, and MySQL. Skilled in building RESTful APIs, authentication systems, CRUD operations, and database solutions. Experienced in API testing, debugging, and improving application performance and user experience.',
      location: 'Greater Noida, Uttar Pradesh, India',
      email: 'ashmit8736@gmail.com',
      phone: '+91 8736971973',
      githubUrl: 'https://github.com/Ashmit8736',
      linkedinUrl: 'https://linkedin.com/in/Ashmit8736',
    };
    
    if (profile) {
      await prisma.profile.update({ where: { id: profile.id }, data: profileData });
    } else {
      await prisma.profile.create({ data: profileData });
    }

    // 2. Education
    const eduExists = await prisma.education.findFirst({ where: { institution: 'Galgotias College of Engineering and Technology' } });
    if (!eduExists) {
      await prisma.education.create({
        data: {
          institution: 'Galgotias College of Engineering and Technology',
          degree: 'B.Tech in Information Technology',
          fieldOfStudy: 'Information Technology',
          score: 'CGPA: 7.2',
          startYear: 2021,
          endYear: 2025,
          description: 'Relevant Coursework: DBMS, Computer Networks, Software Engineering, Data Analytics'
        }
      });
    }

    // 3. Experience
    const expExists = await prisma.experience.findFirst({ where: { companyName: 'Mojija Ecommerce Pvt. Ltd.' } });
    if (!expExists) {
      await prisma.experience.create({
        data: {
          companyName: 'Mojija Ecommerce Pvt. Ltd.',
          role: 'MERN Full Stack Developer',
          employmentType: 'Full-time',
          location: 'Greater Noida, Uttar Pradesh, India',
          startDate: new Date('2025-07-01T00:00:00.000Z'),
          isCurrent: true,
          description: '• Developed and maintained scalable MERN stack web applications using MongoDB, Express.js, React.js, and Node.js.\n• Built and optimized RESTful APIs, authentication systems, SQL queries, and stored procedures for production-grade services.\n• Performed manual testing, API testing, and debugging to ensure application reliability and performance.\n• Collaborated with cross-functional teams to improve application security, user experience, and product workflows.'
        }
      });
    }

    // 4. Skills
    const skillsToInsert = [
      { name: 'JavaScript (ES6+)', category: 'Languages' },
      { name: 'Java', category: 'Languages' },
      { name: 'React.js', category: 'Frontend' },
      { name: 'HTML5', category: 'Frontend' },
      { name: 'CSS3', category: 'Frontend' },
      { name: 'Bootstrap', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Express.js', category: 'Backend' },
      { name: 'RESTful APIs', category: 'Backend' },
      { name: 'MongoDB', category: 'Databases' },
      { name: 'MySQL', category: 'Databases' },
      { name: 'Stored Procedures', category: 'Databases' },
      { name: 'Git', category: 'DevOps / Tools' },
      { name: 'GitHub', category: 'DevOps / Tools' },
      { name: 'Manual Testing', category: 'Testing' },
      { name: 'API Testing (Postman)', category: 'Testing' },
      { name: 'Debugging', category: 'Testing' }
    ];

    for (const skill of skillsToInsert) {
      const s = await prisma.skill.findFirst({ where: { name: skill.name } });
      if (!s) {
        await prisma.skill.create({ data: skill });
      }
    }

    res.status(200).json({ success: true, message: 'Resume data seeded successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
