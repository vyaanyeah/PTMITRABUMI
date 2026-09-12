// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';
import { services, fieldsOfWork } from '../data/services';
import { documentationProjects as fallbackDocs } from '../data/projects';
import { getProjects } from '../services/projectService';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import TimelineItem from '../components/TimelineItem';
import SEO from '../components/SEO';
import heroImg from '../assets/hero-construction.jpg';
import aboutImg from '../assets/about-construction.jpg';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': 'https://ptmitrabumirejeki.com/#organization',
  name: 'PT Mitra Bumi Rejeki',
  alternateName: 'Mitra Bumi Rejeki General Contractor',
  url: 'https://ptmitrabumirejeki.com',
  logo: 'https://ptmitrabumirejeki.com/assets/logo-gold.jpeg',
  image: 'https://ptmitrabumirejeki.com/images/projects/hotel-sm-tower-malioboro.png',
  description: 'Perusahaan General Contractor dan Developer profesional di Semarang yang melayani jasa konstruksi gedung, renovasi bangunan, interior, dan pengembangan proyek.',
  telephone: '+628812902112',
  email: 'mitrabumirejeki@gmail.com',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Watu Kaji No. 107, RT 02/RW 07, Gedawang',
    addressLocality: 'Banyumanik, Semarang',
    addressRegion: 'Jawa Tengah',
    postalCode: '50268',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -7.0737,
    longitude: 110.4268,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  sameAs: [
    'https://www.google.com/maps/?q=Jl.+Watu+Kaji+No.+107,+Gedawang,+Banyumanik,+Semarang',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Layanan Konstruksi & Developer',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'General Contractor & Konstruksi Gedung' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Renovasi Rumah & Komersial' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desain Arsitektur & Interior' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Manajemen Proyek & Konstruksi Baja' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pengembangan Proyek / Developer' } },
    ],
  },
};

// ── Stat Card ──────────────────────────────────────────────
function StatBlock({ value, label, delay = 0 }) {
  return (
    <div data-aos="fade-up" data-aos-delay={delay} className="flex flex-col gap-1 text-center">
      <span className="text-brand-gold font-black text-2xl sm:text-4xl md:text-5xl leading-none">{value}</span>
      <span className="text-white/50 text-[9px] sm:text-xs tracking-[0.12em] sm:tracking-[0.2em] uppercase leading-snug">{label}</span>
    </div>
  );
}

// ── Field of Work Row (numbered, matches reference layout) ──
const fieldNumberColors = [
  'text-amber-500', 'text-sky-400', 'text-emerald-400', 'text-rose-400', 'text-violet-400',
  'text-orange-400', 'text-cyan-400', 'text-lime-400', 'text-pink-400', 'text-yellow-300',
];

function FieldRow({ field, index }) {
  const { tObj } = useLanguage();
  const num = String(index + 1).padStart(2, '0');
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 50}
      className="flex items-center gap-3 px-4 py-4 border-b border-white/5 last:border-b-0"
    >
      <span className={`font-bold text-base ${fieldNumberColors[index] || 'text-brand-gold'}`}>{num}</span>
      <span className="text-white text-base md:text-lg font-medium">{tObj(field.title)}</span>
    </div>
  );
}

export default function Home() {
  const { t, tObj, lang } = useLanguage();
  const timelineItems = t('experience.timeline');
  const [docList, setDocList] = useState(fallbackDocs);

  useEffect(() => {
    let isMounted = true;
    getProjects().then((data) => {
      if (isMounted && data && data.length > 0) {
        // Ambil proyek unggulan atau proyek dengan foto
        const docs = data
          .filter(p => p.image)
          .slice(0, 8)
          .map(p => ({ id: p.id, title: p.title, image: p.image }));
        if (docs.length > 0) {
          setDocList(docs);
        }
      }
    });
    return () => { isMounted = false; };
  }, []);

  return (
    <PageTransition>
      <SEO
        title="PT Mitra Bumi Rejeki | General Contractor & Developer Semarang"
        description="PT Mitra Bumi Rejeki adalah kontraktor umum dan pengembang profesional di Semarang. Berpengalaman dalam pembangunan gedung, renovasi komersial, interior, dan infrastruktur berstandar ISO 9001."
        canonical="/"
        schema={organizationSchema}
        keywords="kontraktor semarang, general contractor semarang, jasa konstruksi gedung, renovasi ruko hotel, developer jawa tengah, pt mitra bumi rejeki"
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero section">
        <div className="absolute inset-0 z-0">
          <motion.img
            src={heroImg}
            alt="Proyek konstruksi bangunan dan struktur PT Mitra Bumi Rejeki General Contractor"
            fetchpriority="high"
            className="w-full h-full object-cover"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-brand-darkblack/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-darkblack/60 via-transparent to-brand-darkblack/90" />
        </div>

        <div className="container-custom relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="max-w-5xl lg:max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="label-gold text-[11px]">{t('hero.label')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[54px] leading-[1.15] tracking-tight mb-6"
            >
              {t('hero.headline').split(',').map((part, i) => (
                <span key={i}>
                  {i === 0 ? <>{part},<br /></> : <span className="text-brand-gold">{part.trim()}</span>}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/65 text-base md:text-lg max-w-2xl leading-relaxed mb-10 text-justify"
            >
              {t('hero.subheadline')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Link to="/about" className="btn-gold text-center justify-center" id="hero-cta-primary">{t('hero.ctaPrimary')}</Link>
              <Link to="/portfolio" className="btn-outline-white text-center justify-center" id="hero-cta-secondary">{t('hero.ctaSecondary')}</Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-white/30 text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-px h-8 bg-gradient-to-b from-brand-gold/60 to-transparent" />
        </motion.div>
      </section>

      {/* ── STATISTICS ───────────────────────────────────────── */}
      <section id="statistics" className="bg-brand-darkblack py-10 sm:py-14" aria-label="Company statistics">
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-2 sm:gap-8 md:gap-16">
            {company.stats.map((stat, i) => (
              <StatBlock key={i} value={stat.value} label={tObj(stat.label)} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANY INTRO ────────────────────────────────────── */}
      <section id="company-intro" className="section-padding bg-brand-offwhite" aria-label="Company introduction">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div data-aos="fade-right" data-aos-duration="800" className="relative">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={aboutImg} alt="Pekerjaan interior dan konstruksi bangunan PT Mitra Bumi Rejeki ISO 9001" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-darkblack/10 to-transparent" />
              </div>
              <div className="absolute sm:-bottom-4 sm:-right-4 -bottom-2 -right-2 w-2/3 h-2/3 border border-brand-gold/30 -z-10" />
              <div className="absolute sm:-top-4 sm:-left-4 top-2 left-2 bg-brand-darkblack border border-brand-gold/40 px-3 py-2 sm:px-4 sm:py-3 z-10">
                <span className="text-brand-gold text-[10px] font-bold tracking-widest uppercase block">ISO 9001</span>
                <span className="text-white/40 text-[9px] tracking-wider">Quality Management</span>
              </div>
            </div>

            {/* Text */}
            <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="100" className="flex flex-col gap-7">
              <SectionTitle label={t('intro.label')} headline={t('intro.headline')} />
              <p className="body-lg text-justify">{t('intro.body')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {company.values.map((v, idx) => (
                  <div key={v.id} data-aos="zoom-in" data-aos-delay={idx * 80 + 200} className="flex items-center gap-3 bg-white border border-brand-black/5 px-4 py-3 shadow-sm">
                    <span className="text-brand-gold text-lg shrink-0">{v.icon}</span>
                    <span className="text-brand-black font-semibold text-sm">{tObj(v.label)}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-gold self-start">{t('intro.readMore')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ─────────────────────────────────── */}
      <section id="vision-mission" className="section-padding bg-brand-black" aria-label="Vision and mission">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px border border-white/5">
            {[
              { labelKey: 'vision.label', headKey: 'vision.headline', text: tObj(company.vision), delay: 0 },
              { labelKey: 'mission.label', headKey: 'mission.headline', text: tObj(company.mission), delay: 100 },
              { labelKey: 'goal.label', headKey: 'goal.headline', text: tObj(company.goal), delay: 200 },
            ].map(({ labelKey, headKey, text, delay }) => (
              <div
                key={labelKey}
                data-aos="fade-up"
                data-aos-delay={delay}
                className="p-6 sm:p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/5 last:border-b-0 last:border-r-0"
              >
                <span className="label-gold text-[10px] block mb-4">{t(labelKey)}</span>
                <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-4 leading-snug">{t(headKey)}</h2>
                <p className="text-white/55 text-sm leading-relaxed text-justify">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section id="services-preview" className="section-padding bg-brand-offwhite" aria-label="Services preview">
        <div className="container-custom">
          <div data-aos="fade-up">
            <SectionTitle label={t('services.label')} headline={t('services.headline')} subhead={t('services.subhead')} className="mb-12" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {services.map((svc, i) => (
              <div key={svc.id} data-aos="fade-up" data-aos-delay={i * 120} className="h-full flex flex-col">
                <ServiceCard service={svc} index={0} />
              </div>
            ))}
          </div>
          <div data-aos="fade-up" data-aos-delay="100" className="mt-10">
            <Link to="/services" className="btn-outline-gold">
              {lang === 'id' ? 'Lihat Semua Layanan' : 'View All Services'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── FIELD OF WORK ────────────────────────────────────── */}
      <section id="field-of-work" className="section-padding-sm bg-brand-black" aria-label="Field of work">
        <div className="container-custom">
          <div data-aos="fade-up">
            <SectionTitle label={t('fieldOfWork.label')} headline={t('fieldOfWork.headline')} subhead={t('fieldOfWork.subhead')} light className="mb-10" />
          </div>
          <div className="border border-white/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
              {fieldsOfWork.map((field, i) => (
                <FieldRow key={field.id} field={field} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE TIMELINE ──────────────────────────────── */}
      <section id="experience" className="section-padding bg-brand-darkblack" aria-label="Experience timeline">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div data-aos="fade-right">
              <SectionTitle label={t('experience.label')} headline={t('experience.headline')} light />
            </div>
            <div className="flex flex-col">
              {Array.isArray(timelineItems) && timelineItems.map((item, i) => (
                <div key={item.year} data-aos="fade-left" data-aos-delay={i * 150}>
                  <TimelineItem year={item.year} title={item.title} desc={item.desc} isLast={i === timelineItems.length - 1} index={0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DOCUMENTATION PREVIEW ────────────────────────────── */}
      <section id="documentation-preview" className="section-padding bg-brand-offwhite" aria-label="Project documentation preview">
        <div className="container-custom">
          <div data-aos="fade-up">
            <SectionTitle label={t('documentation.label')} headline={t('documentation.headline')} subhead={t('documentation.subhead')} className="mb-10" />
          </div>
          {/* Card Grid — foto + judul di bawah */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {docList.map((doc, i) => (
              <div
                key={doc.id}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                className="group bg-white border border-brand-black/8 overflow-hidden transition-all duration-300 hover:border-brand-gold/40 hover:shadow-lg"
              >
                {/* Foto — aspect 4:3, tidak terlalu besar */}
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-darkblack">
                  {doc.image ? (
                    <img
                      src={doc.image}
                      alt={`${doc.title} - Dokumentasi proyek konstruksi PT Mitra Bumi Rejeki`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-darkblack bg-grid-pattern flex items-center justify-center">
                      <span className="text-brand-gold/15 font-black text-4xl select-none">{doc.title.charAt(0)}</span>
                    </div>
                  )}
                </div>
                {/* Judul di bawah */}
                <div className="px-3 py-3 sm:px-4 sm:py-3.5">
                  <p className="text-brand-black text-xs sm:text-sm font-semibold leading-snug group-hover:text-brand-gold transition-colors duration-200">
                    {doc.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section id="cta-banner" className="bg-brand-gold py-16 md:py-20" aria-label="Call to action">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div data-aos="fade-right">
              <h2 className="text-brand-darkblack font-black text-2xl md:text-3xl leading-tight mb-4">{t('cta.headline')}</h2>
              <p className="text-brand-darkblack/70 text-base leading-relaxed text-justify">{t('cta.body')}</p>
            </div>
            <div data-aos="fade-left" data-aos-delay="100" className="flex justify-start md:justify-end">
              <Link
                to="/contact"
                id="cta-contact-button"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-darkblack text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-brand-black hover:shadow-xl"
              >
                {t('cta.button')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
