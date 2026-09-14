// src/components/ProjectCard.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectCard({ project, index = 0 }) {
  const { lang, t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
      className="group"
    >
      <Link
        to={`/portfolio/${project.id}`}
        aria-label={`${t('portfolio.viewDetail')}: ${project.title}`}
        className="block rounded-xl overflow-hidden border border-brand-black/5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 bg-white"
      >
        {/* Image block */}
        <div className="relative overflow-hidden aspect-[4/3] bg-brand-black">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} - ${project.location ? `${project.location} - ` : ''}PT Mitra Bumi Rejeki`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            /* Styled placeholder when no image */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-darkblack bg-grid-pattern">
              <div className="text-brand-gold/20 text-6xl font-black select-none">
                {project.title.charAt(0)}
              </div>
              <div className="mt-3 text-white/10 text-xs tracking-widest uppercase">
                {lang === 'id' ? 'Foto Segera Hadir' : 'Photo Coming Soon'}
              </div>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-darkblack via-brand-darkblack/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-brand-gold/90 text-brand-darkblack text-[10px] font-bold px-2.5 py-1 tracking-wider uppercase rounded-md">
              {lang === 'id' ? project.categoryID : project.category}
            </span>
          </div>

          {/* View CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="btn-outline-white text-xs px-5 py-2.5 scale-95 group-hover:scale-100 transition-transform duration-300">
              {t('portfolio.viewDetail')}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="bg-white px-5 py-4 group-hover:border-brand-gold/20 transition-colors duration-300">
          <h3 className="font-bold text-brand-black text-base mb-1 group-hover:text-brand-gold transition-colors duration-200 leading-snug">
            {project.title}
          </h3>
          {project.location && (
            <p className="text-brand-gray text-xs flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-brand-gold/80 shrink-0" strokeWidth={1.5} />
              <span>{project.location}</span>
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
