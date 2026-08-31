import { motion } from 'framer-motion';

export default function AboutSection({ profile }) {
  if (!profile || (!profile.about && !profile.shortBio)) return null;

  return (
    <section id="about" className="scroll-mt-20 py-5 md:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-widest bg-[#ff5a1f] bg-clip-text text-transparent mb-4 uppercase tracking-tighter">About Me</h2>
          <div className="w-20 h-1 bg-[#ff5a1f] mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl bg-[#111111] border border-[#333]  shadow-xl "
          >
            <h3 className="text-2xl font-heading font-bold tracking-wider text-white mb-6">Who I Am</h3>
            <p className="text-white font-bold text-lg leading-relaxed mb-6 font-bold">
              {profile.about || profile.shortBio}
            </p>
            {profile.location && (
              <div className="flex items-center text-white font-bold">
                <span className="font-semibold mr-2">Based in:</span> {profile.location}
              </div>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative flex items-center justify-center h-[400px]"
          >
            {/* Background Shape */}
            <div className="absolute inset-0 bg-[#ff5a1f] rounded-bl-[120px] rounded-tr-[40px] transform -translate-x-4 translate-y-4"></div>
            
            {/* Image Container */}
            <div className="relative w-full h-full overflow-hidden rounded-bl-[120px] rounded-tr-[40px] border-4 border-[#0a0a0a] shadow-2xl z-10">
              <img 
                src={profile.profileImage || "/profile.jpg"} 
                alt={profile.fullName || "Profile"} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if user hasn't added the image yet
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}