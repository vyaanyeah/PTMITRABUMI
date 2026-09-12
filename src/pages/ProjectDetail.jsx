// src/pages/ProjectDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { projects as fallbackProjects } from '../data/projects';
import { getProjectById, getProjects } from '../services/projectService';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

export default function ProjectDetail() {
  const { id } = useParams();
  const { t, tObj, lang } = useLanguage();
  const [project, setProject] = useState(() => fallbackProjects.find(p => p.id === id) || null);
  const [allProjects, setAllProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(!project);

  useEffect(() => {
    let isMounted = true;
    setLoading(!project);

    // Fetch this project
    getProjectById(id).then((data) => {
      if (isMounted) {
        if (data) setProject(data);
        setLoading(false);
      }
    });

    // Fetch all projects for "Proyek Lainnya" section
    getProjects().then((list) => {
      if (isMounted && list && list.length > 0) {
        setAllProjects(list);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-offwhite">
          <div className="w-10 h-10 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin mb-4" />
          <p className="text-xs uppercase tracking-widest text-brand-gray">Memuat Detail Proyek...</p>
        </div>
      </PageTransition>
    );
  }

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-brand-offwhite">
          <div className="text-center p-8">
            <h1 className="text-brand-black font-black text-3xl mb-4">
              {lang === 'id' ? 'Proyek Tidak Ditemukan' : 'Project Not Found'}
            </h1>
            <Link to="/portfolio" className="btn-gold">
              {t('projectDetail.back').replace(/^[←\s]+/, '')}
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const projectDesc = tObj(project.description) || (typeof project.description === 'string' ? project.description : (project.description?.id || ''));
  const cleanDesc = projectDesc
    ? projectDesc.replace(/\s+/g, ' ').slice(0, 160)
    : `${project.title} - Proyek konstruksi dan renovasi oleh PT Mitra Bumi Rejeki di ${project.location || 'Indonesia'}.`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: 'https://ptmitrabumirejeki.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portofolio',
        item: 'https://ptmitrabumirejeki.com/portfolio',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `https://ptmitrabumirejeki.com/portfolio/${project.id || id}`,
      },
    ],
  };

  return (
    <PageTransition>
      <SEO
        title={`${project.title} - Portofolio PT Mitra Bumi Rejeki`}
        description={cleanDesc}
        canonical={`/portfolio/${project.id || id}`}
        ogImage={project.image}
        ogType="article"
        schema={breadcrumbSchema}
        keywords={`${project.title}, ${project.location || ''}, proyek pt mitra bumi rejeki, kontraktor semarang`}
      />

      {/* ── PROJECT HEADER ────────────────────────────────────── */}
      {/* Foto tidak di-stretch full banner (resolusi rendah) — ditampilkan sebagai thumbnail proporsional */}
      <section className="relative pt-24 pb-8 bg-brand-darkblack overflow-hidden" aria-label={`${project.title} header`}>
        {/* Background texture tipis */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_20%_50%,_#C9A84C_0%,_transparent_60%)]" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            {/* Left: label + title + meta */}
            <div className="flex-1">

              <span className="label-gold text-[10px] block mb-3">
                {lang === 'id' ? project.categoryID : project.category}
              </span>
              <h1 className="text-white font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight mb-3">
                {project.title}
              </h1>
              {project.location && (
                <p className="text-white/45 text-sm flex items-center gap-2">
                  <span className="text-brand-gold">◎</span> {project.location}
                </p>
              )}
            </div>
            {/* Right: foto thumbnail proporsional — tidak di-stretch, resolusi rendah tidak kentara */}
            {project.image && (
              <div className="shrink-0 w-full md:w-64 lg:w-80">
                <div className="relative overflow-hidden border border-brand-gold/20" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.location ? `${project.location} - ` : ''}PT Mitra Bumi Rejeki`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    style={{ opacity: 0.9 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darkblack/40 to-transparent" />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Garis bawah tipis */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      </section>

      {/* ── DETAIL BODY ──────────────────────────────────────── */}
      <section id="project-detail" className="section-padding bg-brand-offwhite" aria-label="Project detail">
        <div className="container-custom">

          {/* Breadcrumb / Back Button */}
          <div data-aos="fade-right" className="mb-8">
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-brand-gold bg-transparent text-brand-gold hover:bg-brand-gold hover:text-brand-darkblack text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-brand-gold/20 active:scale-95 no-underline"
              aria-label="Back to portfolio"
            >
              {t('projectDetail.back').replace(/^[←\s]+/, '')}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div data-aos="fade-right" data-aos-duration="700" className="lg:col-span-2 flex flex-col gap-8">
              <div>

                <h2 className="heading-lg text-brand-black mb-2">{project.title}</h2>
                {project.location && (
                  <p className="text-brand-gray flex items-center gap-2 text-sm">
                    <span className="text-brand-gold">◎</span> {project.location}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-brand-black font-bold text-lg mb-3">
                  {lang === 'id' ? 'Deskripsi Proyek' : 'Project Description'}
                </h3>
                <p className="body-lg text-justify">
                  {tObj(project.description) || (typeof project.description === 'string' ? project.description : (project.description?.id || ''))}
                </p>
              </div>

              {/* Scope of Work */}
              {project.scopeOfWork && (
                <div>
                  <h3 className="text-brand-black font-bold text-lg mb-3">
                    {t('projectDetail.scopeOfWork')}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {(Array.isArray(project.scopeOfWork) ? project.scopeOfWork : [project.scopeOfWork]).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-brand-gray text-sm">
                        <span className="text-brand-gold mt-0.5">▸</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h3 className="text-brand-black font-bold text-lg mb-4">{t('projectDetail.gallery')}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="aspect-square overflow-hidden">
                        <img src={img} alt={`${project.title} - Dokumentasi foto konstruksi ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div data-aos="fade-left" data-aos-delay="150" className="lg:col-span-1">
              <div className="bg-brand-black p-5 sm:p-7 flex flex-col gap-6 sticky top-24">

                <h3 className="text-white font-bold text-base">
                  {lang === 'id' ? 'Informasi Proyek' : 'Project Information'}
                </h3>

                {/* Category */}
                <div className="border-b border-white/5 pb-4">
                  <span className="text-white/40 text-xs uppercase tracking-widest block mb-1">{t('projectDetail.category')}</span>
                  <span className="text-brand-gold font-semibold text-sm">
                    {lang === 'id' ? project.categoryID : project.category}
                  </span>
                </div>

                {/* Location */}
                {project.location && (
                  <div className="border-b border-white/5 pb-4">
                    <span className="text-white/40 text-xs uppercase tracking-widest block mb-1">{t('projectDetail.location')}</span>
                    <span className="text-white text-sm">{project.location}</span>
                  </div>
                )}

                {/* CTA */}
                <Link
                  to="/contact"
                  className="btn-gold text-center justify-center mt-2"
                  id={`project-${project.id}-contact-cta`}
                >
                  {lang === 'id' ? 'Diskusikan Proyek' : 'Discuss This Project'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER PROJECTS ───────────────────────────────────── */}
      <section className="section-padding-sm bg-brand-offwhite border-t border-brand-black/5" aria-label="Other projects">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-brand-black font-bold text-xl">
              {lang === 'id' ? 'Proyek Lainnya' : 'Other Projects'}
            </h2>
            <Link to="/portfolio" className="text-brand-gold text-sm font-semibold hover:text-brand-lightgold transition-colors duration-200">
              {lang === 'id' ? 'Lihat Semua' : 'View All'}
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {allProjects
              .filter(p => p.id !== id)
              .slice(0, 4)
              .map(p => (
                <Link
                  key={p.id}
                  to={`/portfolio/${p.id}`}
                  className="group block"
                  aria-label={p.title}
                >
                  <div className="aspect-square bg-brand-darkblack relative overflow-hidden border border-brand-black/5 group-hover:border-brand-gold/30 transition-colors duration-300">
                    {p.image && (
                      <img
                        src={p.image}
                        alt={`${p.title} - Proyek PT Mitra Bumi Rejeki`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-darkblack/80 via-brand-darkblack/10 to-transparent" />
                    <div className="absolute inset-0 flex items-end p-3">
                      <p className="text-white/80 text-xs font-medium leading-tight group-hover:text-brand-gold transition-colors duration-200">
                        {p.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
