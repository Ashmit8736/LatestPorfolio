import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon as Github } from '../icons';

export default function ProjectsSection({ projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-5 md:py-24 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#ff5a1f] to-orange-400 bg-clip-text text-transparent mb-4 uppercase tracking-tighter">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ff5a1f] to-orange-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors"
            >
              <div className="relative h-48 bg-gradient-to-tr from-blue-900/40 to-emerald-900/40 border-b border-white/10 overflow-hidden">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-black text-white/10 group-hover:scale-110 transition-transform duration-500">
                    {project.title.substring(0, 2).toUpperCase()}
                  </div>
                )}
                {project.featured && (
                  <span className="absolute top-4 right-4 bg-[#ff5a1f] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Featured
                  </span>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ff5a1f] transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                  {project.description}
                </p>
                
                {project.techStack && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.split(',').map(tech => tech.trim()).slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.split(',').length > 4 && (
                      <span className="text-xs font-medium text-gray-500 bg-white/5 px-2.5 py-1 rounded-md">+{project.techStack.split(',').length - 4}</span>
                    )}
                  </div>
                )}
                
                <div className="flex gap-4 mt-auto pt-4 border-t border-white/10">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                      <Github className="w-4 h-4" /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#ff5a1f] hover:text-blue-300 transition-colors ml-auto">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}