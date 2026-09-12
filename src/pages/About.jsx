// src/pages/About.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';
import aboutImg from '../assets/about-construction.jpg';
import heroImg from '../assets/hero-construction.jpg';

export default function About() {
  const { t, tObj, lang } = useLanguage();

  return (
    <PageTransition>
      <SEO
        title={lang === 'id' ? 'Tentang Kami - Profil PT Mitra Bumi Rejeki' : 'About Us - PT Mitra Bumi Rejeki Profile'}
        description={lang === 'id' ? 'Kenali PT Mitra Bumi Rejeki — General Contractor dan Developer terpercaya dengan pengalaman sejak tahun 2000, tersertifikasi ISO 9001 untuk jasa konstruksi dan renovasi.' : 'Discover PT Mitra Bumi Rejeki — Trusted General Contractor and Developer with construction experience since 2000, ISO 9001 certified in Semarang, Central Java.'}
        canonical="/about"
        keywords="profil pt mitra bumi rejeki, tentang kami, kontraktor berpengalaman semarang, iso 9001 kontraktor"
      />

      {/* ── PAGE HEADER ──────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-brand-darkblack overflow-hidden" aria-label="About page header">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={heroImg} alt="Latar belakang konstruksi PT Mitra Bumi Rejeki" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-brand-darkblack/80" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="label-gold text-[11px]">{t('about.label')}</span>

            <h1 className="text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight max-w-3xl">
              {t('about.headline')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT BODY ───────────────────────────────────────── */}
      <section id="about-body" className="section-padding bg-brand-offwhite" aria-label="About company">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div data-aos="fade-right" data-aos-duration="800" className="relative order-2 lg:order-1">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={aboutImg} alt="Aktivitas dan proyek konstruksi bangunan PT Mitra Bumi Rejeki" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute sm:-bottom-4 sm:-right-4 -bottom-2 -right-2 w-2/3 h-2/3 border border-brand-gold/25 -z-10" />
            </div>

            {/* Text */}
            <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="100" className="flex flex-col gap-6 order-1 lg:order-2">
              <SectionTitle label={t('intro.label')} headline={t('intro.headline')} />
              <p className="body-lg text-justify">{t('intro.body')}</p>
              <p className="body-lg text-justify">{tObj(company.description)}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {company.values.map((v, idx) => (
                  <div key={v.id} data-aos="zoom-in" data-aos-delay={idx * 80 + 200} className="flex items-center gap-3 bg-white border border-brand-black/5 px-4 py-3 shadow-sm">
                    <span className="text-brand-gold text-lg shrink-0">{v.icon}</span>
                    <span className="text-brand-black font-semibold text-sm">{tObj(v.label)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION / MISSION / GOAL ──────────────────────────── */}
      <section id="vision-mission-goal" className="section-padding bg-brand-black" aria-label="Vision mission goal">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { labelKey: 'vision.label', headKey: 'vision.headline', text: tObj(company.vision), icon: '◈', delay: 0 },
              { labelKey: 'mission.label', headKey: 'mission.headline', text: tObj(company.mission), icon: '◎', delay: 120 },
              { labelKey: 'goal.label', headKey: 'goal.headline', text: tObj(company.goal), icon: '◆', delay: 240 },
            ].map(({ labelKey, headKey, text, icon, delay }) => (
              <div
                key={labelKey}
                data-aos="fade-up"
                data-aos-delay={delay}
                className="flex flex-col gap-5 p-6 sm:p-8 border border-white/5 hover:border-brand-gold/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 border border-brand-gold/40 flex items-center justify-center">
                  <span className="text-brand-gold">{icon}</span>
                </div>
                <div>
                  <span className="label-gold text-[10px] block mb-2">{t(labelKey)}</span>

                  <h3 className="text-white font-bold text-xl mb-3">{t(headKey)}</h3>
                  <p className="text-white/55 text-sm leading-relaxed text-justify">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE & AWARDS ──────────────────────────────── */}
      <section id="experience-awards" className="section-padding bg-brand-darkblack" aria-label="Experience and awards">
        <div className="container-custom">
          <div data-aos="fade-up" className="mb-12">
            <span className="label-gold text-[11px] block mb-3">EXPERIENCE & AWARDS</span>
            <h2 className="text-white font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight">
              {lang === 'id' ? 'Pengalaman & Penghargaan' : 'Experience & Awards'}
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10 bg-brand-black/40">
            {/* 1. Project Experience */}
            <div data-aos="fade-up" data-aos-delay="0" className="p-8 sm:p-10 flex flex-col justify-start">
              <div className="mb-6">
                <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg sm:text-xl tracking-wider uppercase mb-3">
                PROJECT EXPERIENCE
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {lang === 'id'
                  ? '18 — Proyek yang tercantum pada company profile.'
                  : '18 — Projects listed on the company profile.'}
              </p>
            </div>

            {/* 2. Perumahan Experience */}
            <div data-aos="fade-up" data-aos-delay="100" className="p-8 sm:p-10 flex flex-col justify-start">
              <div className="mb-6">
                <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg sm:text-xl tracking-wider uppercase mb-3">
                PERUMAHAN EXPERIENCE
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {lang === 'id'
                  ? 'Pengalaman pekerjaan perumahan sesuai daftar proyek.'
                  : 'Residential development experience according to project list.'}
              </p>
            </div>

            {/* 3. Awards */}
            <div data-aos="fade-up" data-aos-delay="200" className="p-8 sm:p-10 flex flex-col justify-start">
              <div className="mb-6">
                <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 14.25-2.25 6.75 6-2.25 6 2.25-2.25-6.75" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg sm:text-xl tracking-wider uppercase mb-3">
                AWARDS
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {lang === 'id'
                  ? 'ISO 9001 Quality Management — Tercantum pada company profile perusahaan.'
                  : 'ISO 9001 Quality Management — Listed on company profile.'}
              </p>
            </div>
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
                id="cta-contact-button-about"
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
