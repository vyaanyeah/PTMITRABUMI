// src/components/TimelineItem.jsx
import { motion } from 'framer-motion';

export default function TimelineItem({ year, title, desc, isLast = false, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.15 }}
      className="relative flex gap-4 sm:gap-8 md:gap-12"
    >
      {/* Left: year + connector */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-brand-gold bg-brand-darkblack flex items-center justify-center shadow-lg shadow-brand-gold/10 z-10">
          <span className="text-brand-gold font-black text-xs sm:text-sm">{year}</span>
        </div>
        {!isLast && (
          <div className="flex-1 w-px bg-brand-gold/20 mt-2 mb-0" style={{ minHeight: 48 }} />
        )}
      </div>

      {/* Right: content */}
      <div className="pb-10 sm:pb-12 flex-1">

        <h3 className="text-white font-bold text-lg md:text-xl mb-2">{title}</h3>
        <p className="text-white/55 text-sm leading-relaxed text-justify">{desc}</p>
      </div>
    </motion.div>
  );
}
