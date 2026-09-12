// src/components/TeamCard.jsx
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function TeamCard({ member, index = 0 }) {
  const { tObj } = useLanguage();
  const initials = member.name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group flex flex-col items-center text-center gap-4"
    >
      {/* Photo / Avatar */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand-gold/30 group-hover:border-brand-gold transition-colors duration-300">
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-brand-black flex items-center justify-center">
            <span className="text-brand-gold font-bold text-xl">{initials}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <h4 className="font-bold text-white text-sm sm:text-base">{member.name}</h4>
        <p className="text-brand-gray text-xs mt-1 tracking-wide">{tObj(member.role)}</p>
      </div>
    </motion.div>
  );
}
