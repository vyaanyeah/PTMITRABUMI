// src/data/services.js
// ─────────────────────────────────────────────
// Services data — sourced from "Key Products and Services" in company profile.

export const services = [
  {
    id: 'construction',
    title: {
      id: 'Konstruksi & Bangunan',
      en: 'Construction & Building',
    },
    description: {
      id: 'Bangunan hunian dan komersial, infrastruktur, interior, furnitur, serta landscape. Kami menangani pekerjaan konstruksi dari awal hingga selesai sesuai spesifikasi dan kebutuhan client.',
      en: 'Residential and commercial buildings, infrastructure, interiors, furniture, and landscaping. We handle construction work from start to finish according to specifications and client requirements.',
    },
    features: {
      id: ['Bangunan Hunian', 'Bangunan Komersial', 'Infrastruktur', 'Interior & Furnitur', 'Landscape'],
      en: ['Residential Building', 'Commercial Building', 'Infrastructure', 'Interior & Furniture', 'Landscape'],
    },
  },
  {
    id: 'planning-consulting',
    title: {
      id: 'Perencanaan & Konsultasi',
      en: 'Planning & Consulting',
    },
    description: {
      id: 'Memberikan layanan perencanaan, konsultasi, desain arsitektur, masterplan, dan estimasi anggaran untuk pembangunan maupun renovasi.',
      en: 'Providing planning, consulting, architectural design, masterplan, and budget estimation services for construction and renovation projects.',
    },
    features: {
      id: ['Desain Arsitektur', 'Masterplan', 'Estimasi Anggaran', 'Konsultasi Proyek', 'Perencanaan Renovasi'],
      en: ['Architectural Design', 'Masterplan', 'Budget Estimation', 'Project Consulting', 'Renovation Planning'],
    },
  },
  {
    id: 'quality-management',
    title: {
      id: 'Manajemen Mutu',
      en: 'Quality Management',
    },
    description: {
      id: 'Penerapan standar manajemen mutu dalam setiap tahap pelaksanaan proyek untuk memastikan efisiensi waktu, biaya, dan kualitas pekerjaan terjamin sesuai desain.',
      en: 'Application of quality management standards at every stage of project execution to ensure efficiency in time, cost, and guaranteed workmanship quality in accordance with the design.',
    },
    features: {
      id: ['Standar ISO 9001', 'Pengawasan Mutu', 'Efisiensi Waktu & Biaya', 'Quality Control', 'Dokumentasi Proyek'],
      en: ['ISO 9001 Standard', 'Quality Supervision', 'Time & Cost Efficiency', 'Quality Control', 'Project Documentation'],
    },
  },
];

// Field of Work — from company profile categories
export const fieldsOfWork = [
  {
    id: 'architecture',
    title: { id: 'Arsitektur',              en: 'Architecture'           },
  },
  {
    id: 'civil',
    title: { id: 'Sipil',                   en: 'Civil'                  },
  },
  {
    id: 'electrical',
    title: { id: 'Elektrikal',              en: 'Electrical'             },
  },
  {
    id: 'mechanical',
    title: { id: 'Mekanikal',               en: 'Mechanical'             },
  },
  {
    id: 'environmental',
    title: { id: 'Pengelolaan Lingkungan',  en: 'Environmental Management'},
  },
  {
    id: 'subcontractor',
    title: { id: 'Subkontraktor',           en: 'Subcontractor'          },
  },
  {
    id: 'residential',
    title: { id: 'Residensial',             en: 'Residential'            },
  },
  {
    id: 'commercial',
    title: { id: 'Komersial',               en: 'Commercial'             },
  },
  {
    id: 'contractor',
    title: { id: 'Kontraktor',              en: 'Contractor'             },
  },
  {
    id: 'developer',
    title: { id: 'Developer',               en: 'Developer'              },
  },
];
