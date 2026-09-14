import { motion } from 'framer-motion';
import { CheckCircle2, Play } from 'lucide-react';

function VideoPreview({ mediaUrl, mediaType }) {
  const src = mediaUrl || '/service-preview.png';

  if (mediaType === 'video' && mediaUrl) {
    return (
      <div className="w-full h-full rounded-3xl overflow-hidden relative bg-[#1C1712]">
        <video src={src} controls className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden relative">
      <img
        src={src}
        alt="Website design services preview"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
          <Play className="w-6 h-6 text-[#1C1712] ml-1" fill="currentColor" />
        </span>
      </div>
    </div>
  );
}

export default function ServiceDetailSection({ detail }) {
  if (!detail || !detail.heading) return null;

  const checklist = (detail.checklist || '').split(',').map(t => t.trim()).filter(Boolean);

  return (
    <section className="scroll-mt-24 py-12 md:py-20 bg-[#F7F1E6] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-[#1C1712] mb-2">Service Details</h1>
          <p className="text-sm font-medium text-[#5C5346]">
            <a href="#home" className="hover:text-[#1C1712]">Home</a> / <span className="text-[#F5A623]">Service Details</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-[16/8] rounded-3xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(28,23,18,0.3)] mb-8 md:mb-12"
        >
          <VideoPreview mediaUrl={detail.mediaUrl} mediaType={detail.mediaType} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 md:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1C1712] mb-6">
            {detail.heading}
          </h2>

          <div className="flex items-start gap-4 mb-6">
            <span className="w-9 h-9 rounded-full bg-[#F5A623] text-[#1C1712] font-heading font-bold flex items-center justify-center flex-shrink-0">L</span>
            <p className="text-[#5C5346] leading-relaxed">
              {detail.paragraph1}
            </p>
          </div>

          <p className="text-[#5C5346] leading-relaxed mb-8">
            {detail.paragraph2}
          </p>

          <h3 className="text-xl font-heading font-bold text-[#1C1712] mb-5">Services Include:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {checklist.map(item => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5A623] flex-shrink-0" />
                <span className="text-[#1C1712] font-medium text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {(detail.cardImage1 || detail.cardImage2) && (
          <div className={`grid gap-6 ${detail.cardImage1 && detail.cardImage2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1 max-w-md mx-auto'}`}>
            {detail.cardImage1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative bg-white border border-[#E8DFCE] rounded-2xl p-6 aspect-[4/3] flex flex-col justify-between shadow-[0_10px_25px_-15px_rgba(28,23,18,0.15)] overflow-hidden"
              >
                <img src={detail.cardImage1} alt="Our Services" className="absolute inset-0 w-full h-full object-cover" />
                <div className="relative z-10 flex gap-2 mb-4">
                  <span className="text-xs font-semibold text-[#5C5346] bg-[#F7F1E6] px-3 py-1 rounded-full">Our Services</span>
                </div>
                <p className="relative z-10 text-sm font-medium mt-4 text-white bg-[#1C1712]/70 backdrop-blur-sm px-3 py-1.5 rounded-lg w-fit">Planning & wireframes for every build</p>
              </motion.div>
            )}

            {detail.cardImage2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative bg-[#1C1712] rounded-2xl p-6 aspect-[4/3] flex flex-col justify-between shadow-[0_10px_25px_-15px_rgba(28,23,18,0.3)] overflow-hidden"
              >
                <img src={detail.cardImage2} alt="User Research" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <span className="relative z-10 text-xs font-semibold text-[#F5A623] bg-white/10 px-3 py-1 rounded-full w-fit">User Research</span>
                <p className="relative z-10 text-sm text-[#C9BFAE] font-medium mt-4">Understanding real user needs before build</p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
