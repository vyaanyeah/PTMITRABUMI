// src/pages/Services.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { services as servicesList, fieldsOfWork } from '../data/services';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import { valueIconMap } from '../components/ValueChips';
import { Award } from 'lucide-react';
import SEO from '../components/SEO';
import heroImg from '../assets/hero-construction.jpg';

// ── Service Card (inline, no prop collision) ───────────────
function ServiceCard({ service, index }) {
  const { tObj } = useLanguage();
  const features = tObj(service.features) || [];

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 130}
      className="group relative flex flex-col h-full gap-5 p-7 md:p-8 border bg-white border-brand-black/5 shadow-sm hover:shadow-md hover:border-brand-gold/30 transition-all duration-300 rounded-xl overflow-hidden"
    >
      <h3 className="text-lg md:text-xl font-bold text-brand-black">{tObj(service.title)}</h3>
      <p className="text-sm md:text-base leading-relaxed text-brand-gray text-left">{tObj(service.description)}</p>
      {features.length > 0 && (
        <ul className="flex flex-col gap-2 mt-auto pt-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-brand-gray/80">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Field of Work Row (numbered, no emojis) ───────────────
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
      data-aos-delay={index * 60}
      className="flex items-center gap-3 px-4 py-4 border-b border-brand-black/8 last:border-b-0 bg-white hover:bg-brand-offwhite transition-colors duration-200"
    >
      <span className={`font-bold text-base ${fieldNumberColors[index] || 'text-brand-gold'}`}>{num}</span>
      <span className="font-medium text-brand-black text-base md:text-lg">{tObj(field.title)}</span>
    </div>
  );
}

// ── Quality values data ────────────────────────────────────
const qualityValues = [
  { icon: '◈', id: 'quality',      labelID: 'Kualitas',        labelEN: 'Quality'        },
  { icon: '◎', id: 'efficiency',   labelID: 'Efisiensi',       labelEN: 'Efficiency'     },
  { icon: '◆', id: 'professional', labelID: 'Profesionalisme', labelEN: 'Professionalism'},
  { icon: '◉', id: 'trust',        labelID: 'Kepercayaan',     labelEN: 'Trust'          },
];

// ── Page ────────────────────────────────────────────────────
export default function Services() {
  const { t, tObj, lang } = useLanguage();
  const qmService = servicesList[2] || {};

  return (
    <PageTransition>
      <SEO
        title={lang === 'id' ? 'Layanan Konstruksi & General Contractor | PT Mitra Bumi Rejeki' : 'Construction Services & General Contractor | PT Mitra Bumi Rejeki'}
        description={lang === 'id' ? 'Layanan komprehensif PT Mitra Bumi Rejeki mencakup konstruksi gedung, renovasi bangunan, perencanaan arsitektur, dan manajemen mutu berstandar ISO 9001.' : 'Comprehensive construction services by PT Mitra Bumi Rejeki covering building construction, renovations, architectural planning, and ISO 9001 quality management.'}
        canonical="/services"
        keywords="layanan konstruksi semarang, jasa renovasi gedung, kontraktor bangunan, manajemen proyek konstruksi, arsitektur semarang"
      />

      {/* ── PAGE HEADER ──────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-brand-darkblack overflow-hidden"
        aria-label="Services page header"
      >
        <div className="absolute inset-0 z-0 opacity-15">
          <img src={heroImg} alt="Layanan konstruksi dan pembangunan PT Mitra Bumi Rejeki" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-brand-darkblack/80" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-gold text-[11px]">{t('services.label')}</span>

            <h1 className="text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight max-w-3xl">
              {t('services.headline')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── KEY SERVICES ─────────────────────────────────────── */}
      <section id="key-services" className="section-padding bg-brand-offwhite" aria-label="Key services">
        <div className="container-custom">
          <div data-aos="fade-up">
            <SectionTitle
              label={t('services.label')}
              headline={t('services.headline')}
              subhead={t('services.subhead')}
              className="mb-12"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {servicesList.map((svc, i) => (
              <ServiceCard key={svc.id} service={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY MANAGEMENT HIGHLIGHT ─────────────────────── */}
      <section id="quality-management" className="section-padding-sm bg-brand-black" aria-label="Quality management">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: text */}
            <div data-aos="fade-right" data-aos-duration="800">
              <span className="label-gold text-xs block mb-3">{t('certifications.label')}</span>

              <h2 className="text-white font-bold text-xl sm:text-2xl md:text-3xl mb-4">
                {t('certifications.headline')}
              </h2>
              {qmService.description && (
                <p className="text-white/65 text-base md:text-lg leading-relaxed mb-6 text-justify">
                  {tObj(qmService.description)}
                </p>
              )}
              <div className="inline-flex items-center gap-4 border border-brand-gold/30 px-5 sm:px-6 py-4 rounded-lg">
                <div className="w-11 h-11 border-2 border-brand-gold flex items-center justify-center shrink-0 rounded-md">
                  <span className="text-brand-gold font-black text-xs">ISO</span>
                </div>
                <span className="text-white font-semibold text-base">{t('certifications.iso')}</span>
              </div>
            </div>

            {/* Right: value cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {qualityValues.map(({ id, labelID, labelEN }, i) => {
                const IconComp = valueIconMap[id] || Award;
                return (
                  <div
                    key={id}
                    data-aos="zoom-in"
                    data-aos-delay={i * 80}
                    className="border border-white/5 hover:border-brand-gold/30 transition-colors duration-300 p-5 sm:p-6 flex flex-col gap-3 rounded-xl bg-white/[0.02]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                      <IconComp className="w-5 h-5 text-brand-gold stroke-[1.75]" />
                    </div>
                    <span className="text-white font-semibold text-base md:text-lg">
                      {lang === 'id' ? labelID : labelEN}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FIELD OF WORK ────────────────────────────────────── */}
      <section id="field-of-work" className="section-padding bg-brand-offwhite" aria-label="Field of work">
        <div className="container-custom">
          <div data-aos="fade-up">
            <SectionTitle
              label={t('fieldOfWork.label')}
              headline={t('fieldOfWork.headline')}
              subhead={t('fieldOfWork.subhead')}
              className="mb-10"
            />
          </div>
          <div className="border border-brand-black/8 bg-white rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
              {fieldsOfWork.map((field, i) => (
                <FieldRow key={field.id} field={field} index={i} />
              ))}
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
                id="cta-contact-button-services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-darkblack text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-brand-black hover:shadow-xl rounded-lg"
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
