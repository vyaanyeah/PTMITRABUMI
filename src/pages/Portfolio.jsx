// src/pages/Portfolio.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { projectCategories, projects as initialProjects } from '../data/projects';
import { getProjects } from '../services/projectService';
import PageTransition from '../components/PageTransition';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';
import heroImg from '../assets/hero-construction.jpg';

export default function Portfolio() {
  const { t, lang } = useLanguage();
  const [projectList, setProjectList] = useState(initialProjects);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    let isMounted = true;
    getProjects().then((data) => {
      if (isMounted && data && data.length > 0) {
        setProjectList(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = activeCategory === 'all'
    ? projectList
    : projectList.filter(p => p.category === activeCategory);

  return (
    <PageTransition>
      <SEO
        title={lang === 'id' ? 'Portofolio Proyek Konstruksi & Developer | PT Mitra Bumi Rejeki' : 'Project Portfolio & Construction Works | PT Mitra Bumi Rejeki'}
        description={lang === 'id' ? 'Kumpulan portofolio proyek konstruksi, pembangunan gedung, perumahan, hotel, dan fasilitas publik oleh PT Mitra Bumi Rejeki di berbagai daerah di Indonesia.' : 'Explore construction, commercial, residential, and hotel building projects by PT Mitra Bumi Rejeki across Indonesia.'}
        canonical="/portfolio"
        keywords="portofolio konstruksi, proyek pt mitra bumi rejeki, proyek hotel semarang, pembangunan gedung komersial, perumahan semarang"
      />

      {/* ── PAGE HEADER ──────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-brand-darkblack overflow-hidden" aria-label="Portfolio page header">
        <div className="absolute inset-0 z-0 opacity-15">
          <img src={heroImg} alt="Portofolio proyek konstruksi dan arsitektur PT Mitra Bumi Rejeki" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-brand-darkblack/80" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="label-gold text-[11px]">{t('portfolio.label')}</span>

            <h1 className="text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight max-w-3xl">
              {t('portfolio.headline')}
            </h1>
            <p className="text-white/50 mt-4 text-sm max-w-xl leading-relaxed">{t('portfolio.subhead')}</p>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS GRID ────────────────────────────────────── */}
      <section id="projects-grid" className="section-padding bg-brand-offwhite" aria-label="Projects grid">
        <div className="container-custom">
          {/* Filter bar */}
          <div data-aos="fade-up" className="flex flex-nowrap gap-2 mb-10 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible" role="tablist" aria-label="Project category filter">
            {projectCategories.map(cat => (
              <button
                key={cat.key}
                id={`filter-${cat.key}`}
                role="tab"
                aria-selected={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 border rounded-lg whitespace-nowrap shrink-0 sm:shrink ${
                  activeCategory === cat.key
                    ? 'bg-brand-gold border-brand-gold text-brand-darkblack shadow-sm'
                    : 'bg-white border-brand-black/10 text-brand-gray hover:border-brand-gold hover:text-brand-gold'
                }`}
              >
                {cat.label[lang] ?? cat.label.id}
              </button>
            ))}
          </div>

          {/* Count */}
          <p data-aos="fade-up" data-aos-delay="50" className="text-brand-gray text-sm mb-8">
            {filtered.length} {lang === 'id' ? 'proyek ditemukan' : 'projects found'}
          </p>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
                role="tabpanel"
              >
                {filtered.map((project, i) => (
                  <div key={project.id} data-aos="fade-up" data-aos-delay={Math.min(i * 60, 400)}>
                    <ProjectCard project={project} index={0} />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-brand-gray text-center py-16">
                {t('portfolio.noProjects')}
              </motion.p>
            )}
          </AnimatePresence>


        </div>
      </section>
    </PageTransition>
  );
}
