// src/data/company.js
// ─────────────────────────────────────────────
// Company data — sourced from company profile document.
// Fields marked [PLACEHOLDER] need to be replaced with real data.

export const company = {
  name: 'PT Mitra Bumi Rejeki',
  tagline: 'General Contractor & Developer',
  taglineID: 'Kontraktor & Developer',
  description: {
    id: 'Perusahaan yang bergerak secara profesional sesuai kontrak untuk melaksanakan pekerjaan konstruksi, renovasi, maupun proyek fisik sesuai spesifikasi dan kebutuhan konsumen/client.',
    en: 'A professional company operating under contract to carry out construction, renovation, and physical project works in accordance with specifications and client requirements.',
  },

  // Vision — from company profile
  vision: {
    id: 'Menjadi mitra terpercaya dalam mewujudkan ruang impian yang fungsional, estetis dan berkualitas tinggi.',
    en: 'To be a trusted partner in realizing functional, aesthetic, and high-quality dream spaces.',
  },

  // Mission — from company profile
  mission: {
    id: 'Menerjemahkan visi, konsep dan desain ke dalam bentuk fisik nyata secara fungsional, estetis dan terstruktur.',
    en: 'To translate vision, concepts, and designs into real physical forms in a functional, aesthetic, and structured manner.',
  },

  // Goal — from company profile
  goal: {
    id: 'Efisiensi waktu, biaya dan kualitas terjamin sesuai desain.',
    en: 'Efficiency of time, cost, and guaranteed quality in accordance with the design.',
  },

  // Experience — from company profile
  experience: {
    independentStart: 2000,
    companyFounded: 2026,
  },

  // ISO — from company profile
  certifications: [
    {
      name: 'ISO 9001 Quality Management',
      id: null, // [PLACEHOLDER] — certification ID if available
    },
  ],

  // Contact — from company profile
  contact: {
    phones: [
      { label: 'WhatsApp', number: '088-1290-2112', href: 'https://wa.me/628812902112' },
    ],
    email: 'mitrabumirejeki@gmail.com',
    address: 'Jl. Watu Kaji No. 107, RT 02/RW 07, Gedawang, Banyumanik, Semarang',
    city: 'Semarang, Jawa Tengah, Indonesia',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.0884854!2d110.4268!3d-7.0737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDQnMjUuMyJTIDExMMKwMjUnMzYuNSJF!5e0!3m2!1sen!2sid!4v1!5m2!1sen!2sid',
    mapsUrl: 'https://maps.google.com/?q=Jl.+Watu+Kaji+No.+107,+Gedawang,+Banyumanik,+Semarang',
  },

  // Brand values — from company profile highlights
  values: [
    { id: 'quality',       icon: '◈', label: { id: 'Kualitas',       en: 'Quality'       } },
    { id: 'efficiency',    icon: '◎', label: { id: 'Efisiensi',      en: 'Efficiency'    } },
    { id: 'professional',  icon: '◆', label: { id: 'Profesionalisme', en: 'Professionalism'} },
    { id: 'trust',         icon: '◉', label: { id: 'Kepercayaan',    en: 'Trust'         } },
  ],

  // Stats — fact-supported only
  stats: [
    {
      value: '2000',
      label: { id: 'Pengalaman Dimulai',       en: 'Experience Started'     },
    },
    {
      value: '2026',
      label: { id: 'Perusahaan Berkembang',    en: 'Company Development'    },
    },
    {
      value: '18+',
      label: { id: 'Pengalaman Proyek Tercatat', en: 'Listed Project Experience' },
    },
  ],
};
