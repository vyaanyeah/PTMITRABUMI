// src/pages/Contact.jsx
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';
import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

function ContactInfo({ icon, label, children, delay = 0 }) {
  return (
    <div data-aos="fade-up" data-aos-delay={delay} className="flex gap-4">
      <div className="w-10 h-10 border border-brand-gold/40 flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-brand-gold text-sm">{icon}</span>
      </div>
      <div>
        <span className="text-white/40 text-xs uppercase tracking-widest block mb-1">{label}</span>
        {children}
      </div>
    </div>
  );
}

export default function Contact() {
  const { t, lang } = useLanguage();

  return (
    <PageTransition>
      <SEO
        title={lang === 'id' ? 'Kontak Kami & Konsultasi Proyek | PT Mitra Bumi Rejeki' : 'Contact Us & Project Consultation | PT Mitra Bumi Rejeki'}
        description={lang === 'id' ? 'Hubungi tim ahli PT Mitra Bumi Rejeki untuk konsultasi gratis rencana proyek konstruksi, renovasi gedung, estimasi anggaran RAB, dan arsitektur di Semarang.' : 'Contact PT Mitra Bumi Rejeki for consultation on construction projects, building renovation, budget estimation, and architectural design in Semarang.'}
        canonical="/contact"
        keywords="kontak kontraktor semarang, konsultasi konstruksi, rab renovasi gedung, alamat pt mitra bumi rejeki"
      />

      {/* ── CONTACT MAIN ─────────────────────────────────────── */}
      <section id="contact-main" className="pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32 bg-brand-darkblack" aria-label="Contact information and form">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left: info */}
            <div className="flex flex-col gap-8">
              <div data-aos="fade-right">
                <SectionTitle label={t('contact.label')} headline={t('contact.headline')} subhead={t('contact.subhead')} light as="h1" />
              </div>

              <div className="flex flex-col gap-6 mt-2">
                {company.contact.phones.map(({ label, number, href }, i) => (
                  <ContactInfo key={label} icon="☎" label={label} delay={i * 80 + 100}>
                    <a href={href} className="text-white font-semibold hover:text-brand-gold transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                      {number}
                    </a>
                  </ContactInfo>
                ))}

                <ContactInfo icon="✉" label={t('contact.email')} delay={260}>
                  <a href={`mailto:${company.contact.email}`} className="text-white font-semibold hover:text-brand-gold transition-colors duration-200 break-all">
                    {company.contact.email}
                  </a>
                </ContactInfo>

                <ContactInfo icon="◎" label={t('contact.address')} delay={340}>
                  <a href={company.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-brand-gold transition-colors duration-200 text-sm leading-relaxed">
                    {company.contact.address}
                    <br />
                    <span className="text-white/40">{company.contact.city}</span>
                  </a>
                </ContactInfo>
              </div>
            </div>

            {/* Right: form */}
            <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="150">
              <div className="border border-white/5 p-5 sm:p-7 md:p-10">

                <h2 className="text-white font-bold text-xl mb-8">
                  {t('contact.form.waTitle')}
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GOOGLE MAPS ──────────────────────────────────────── */}
      <section id="google-maps" className="bg-brand-black" aria-label="Office location map">
        <div className="w-full">
          <div data-aos="fade-up" className="container-custom py-4">
            <p className="text-white/40 text-xs tracking-widest uppercase">{t('contact.address')}</p>
            <p className="text-white/70 text-sm mt-1">{company.contact.address}</p>
          </div>
          <div className="w-full h-72 md:h-96">
            <iframe
              id="maps-embed"
              title="PT Mitra Bumi Rejeki Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.3208043!2d110.41800!3d-7.06000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708d0c5dbfe2a3%3A0x5027a76e356f920!2sGedawang%2C%20Banyumanik%2C%20Semarang%20City%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1000000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Google Maps showing Gedawang, Banyumanik, Semarang"
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
