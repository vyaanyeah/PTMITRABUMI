// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const SITE_URL = 'https://ptmitrabumirejeki.com';
const DEFAULT_IMAGE = `${SITE_URL}/images/projects/hotel-sm-tower-malioboro.png`;

export default function SEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  keywords,
  schema,
}) {
  const location = useLocation();
  const { lang } = useLanguage();

  const siteName = 'PT Mitra Bumi Rejeki';
  const defaultTitle = 'PT Mitra Bumi Rejeki | General Contractor & Developer';
  const pageTitle = title ? `${title}` : defaultTitle;

  const defaultDesc = lang === 'id'
    ? 'PT Mitra Bumi Rejeki adalah perusahaan General Contractor dan Developer di Semarang yang bergerak di bidang konstruksi gedung, renovasi, interior, dan arsitektur.'
    : 'PT Mitra Bumi Rejeki is a General Contractor and Developer company in Semarang specializing in building construction, renovation, interior, and architecture.';

  const metaDesc = description || defaultDesc;

  // Make sure canonical is absolute
  const canonicalUrl = canonical
    ? (canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`)
    : `${SITE_URL}${location.pathname}`;

  // Make sure ogImage is absolute
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  const defaultKeywords = 'kontraktor semarang, general contractor, pemborong semarang, renovasi gedung, konstruksi baja, developer perumahan, arsitektur interior, pt mitra bumi rejeki';
  const metaKeywords = keywords
    ? (Array.isArray(keywords) ? keywords.join(', ') : keywords)
    : defaultKeywords;

  return (
    <Helmet>
      {/* ── Standard Meta Tags ── */}
      <title>{pageTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="PT Mitra Bumi Rejeki" />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Open Graph (Facebook, WhatsApp, LinkedIn) ── */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:locale" content={lang === 'id' ? 'id_ID' : 'en_US'} />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={pageTitle} />

      {/* ── Structured Data (JSON-LD) ── */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
