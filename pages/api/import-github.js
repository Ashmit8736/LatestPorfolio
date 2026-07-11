import { prisma } from '../../lib/prisma'

export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.github.com/users/ashmit8736/repos')
    const repos = await response.json()
    
    let imported = 0
    for (const repo of repos) {
      if (repo.fork) continue
      
      const existing = await prisma.project.findFirst({
        where: { title: repo.name }
      })
      
      if (!existing) {
        await prisma.project.create({
          data: {
            title: repo.name,
            description: repo.description || '',
            techStack: repo.language || '',
            githubUrl: repo.html_url,
            liveUrl: repo.homepage || '',
            imageUrl: '',
            featured: repo.stargazers_count > 0
          }
        })
        imported++
      }
    }
    
    res.status(200).json({ success: true, message: `Imported ${imported} new projects from Github.` })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
