import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Filter } from 'lucide-react';
import { GithubIcon as Github } from '../icons';

export default function ProjectsSection({ projects }) {
  const [filter, setFilter] = useState('all');

  if (!projects || projects.length === 0) return null;

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return (project.type || 'personal') === filter;
  });

  return (
    <section id="projects" className="scroll-mt-20 py-5 md:py-24 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[60%] h-[60%] rounded-full bg-[#ff5a1f]/20 blur-[150px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] rounded-full bg-[#e04d19]/20 blur-[120px]"></div>
        <div className="absolute top-[40%] right-[30%] w-[40%] h-[40%] rounded-full bg-[#ff5a1f]/15 blur-[100px]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-widest bg-[#ff5a1f] bg-clip-text text-transparent mb-4 uppercase tracking-tighter">Featured Projects</h2>
          <div className="w-20 h-1 bg-[#ff5a1f] mx-auto rounded-full mb-8"></div>
          
          <div className="flex justify-center items-center">
            <div className="relative inline-flex items-center">
              <Filter className="absolute left-3 w-4 h-4 text-gray-400" />
              <select 
                className="appearance-none bg-black/40 backdrop-blur-md border border-white/20 text-white pl-10 pr-10 py-2 rounded-full focus:outline-none focus:border-[#ff5a1f] transition-colors cursor-pointer font-medium text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all" className="bg-[#111]">All Projects</option>
                <option value="personal" className="bg-[#111]">Personal Projects</option>
                <option value="company" className="bg-[#111]">Company Projects</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div 
                layout
                key={project.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col bg-black/40 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl overflow-hidden hover:bg-black/60 transition-colors"
              >
              <div className="relative h-48 bg-black/50 border-b border-white/10 overflow-hidden">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-heading font-bold tracking-widest text-white/10 group-hover:scale-110 transition-transform duration-500">
                    {project.title.substring(0, 2).toUpperCase()}
                  </div>
                )}
                {project.featured && (
                  <span className="absolute top-4 right-4 bg-[#ff5a1f] text-white text-xs font-heading font-bold tracking-wider px-3 py-1 rounded-full shadow-lg">
                    Featured
                  </span>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-heading font-bold tracking-wider text-white mb-2 group-hover:text-[#ff5a1f] transition-colors">{project.title}</h3>
                <p className="text-white font-bold text-sm mb-6 flex-grow line-clamp-3">
                  {project.description}
                </p>
                
                {project.techStack && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.split(',').map(tech => tech.trim()).slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-xs font-bold text-white bg-black/50 border border-white/10 px-2.5 py-1 rounded-md shadow-sm">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.split(',').length > 4 && (
                      <span className="text-xs font-bold text-white font-bold bg-black/50 border border-white/10 px-2.5 py-1 rounded-md">+{project.techStack.split(',').length - 4}</span>
                    )}
                  </div>
                )}
                
                <div className="flex gap-4 mt-auto pt-4 border-t border-white/10">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-white font-bold hover:text-white transition-colors">
                      <Github className="w-4 h-4" /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#ff5a1f] hover:text-white transition-colors ml-auto">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="col-span-full text-center py-12 text-gray-400 font-medium"
            >
              No projects found for the selected filter.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}