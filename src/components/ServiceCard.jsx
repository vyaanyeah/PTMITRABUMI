// src/components/ServiceCard.jsx
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function ServiceCard({ service, index = 0, dark = false }) {
  const { tObj } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className={`group relative flex flex-col h-full flex-1 gap-5 p-7 md:p-8 border rounded-xl transition-all duration-300 ${
        dark
          ? 'bg-brand-black border-white/5 hover:border-brand-gold/40'
          : 'bg-white border-brand-black/5 shadow-sm hover:shadow-md hover:border-brand-gold/30'
      }`}
    >
      {/* Title */}
      <h3 className={`text-lg md:text-xl font-bold ${dark ? 'text-white' : 'text-brand-black'}`}>
        {tObj(service.title)}
      </h3>

      {/* Description */}
      <p className={`text-sm md:text-base leading-relaxed text-left ${dark ? 'text-white/55' : 'text-brand-gray'}`}>
        {tObj(service.description)}
      </p>

      {/* Features */}
      {service.features && (
        <ul className="flex flex-col gap-2 mt-auto pt-2">
          {tObj(service.features).map((feature, i) => (
            <li
              key={i}
              className={`flex items-center gap-2 text-xs sm:text-sm ${dark ? 'text-white/40' : 'text-brand-gray/80'}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}

    </motion.div>
  );
}
