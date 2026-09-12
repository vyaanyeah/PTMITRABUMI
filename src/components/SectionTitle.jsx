// src/components/SectionTitle.jsx
import { motion } from 'framer-motion';

export default function SectionTitle({
  label,
  headline,
  subhead,
  align = 'left',   // 'left' | 'center'
  light = false,    // light text (on dark bg)
  className = '',
}) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const textColor  = light ? 'text-white' : 'text-brand-black';
  const subColor   = light ? 'text-white/60' : 'text-brand-gray';

  return (
    <motion.div
      className={`flex flex-col gap-4 ${alignClass} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {label && (
        <span className="label-gold">{label}</span>
      )}
      <div className={`flex flex-col gap-1 ${align === 'center' ? 'items-center' : 'items-start'}`}>
        <h2 className={`heading-lg ${textColor} text-balance leading-tight`}>{headline}</h2>
      </div>
      {subhead && (
        <p className={`body-lg max-w-2xl ${subColor}`}>{subhead}</p>
      )}
    </motion.div>
  );
}
