// src/data/team.js
// ─────────────────────────────────────────────
// Team data — from company profile organizational structure.
// NOTE: Name-to-role mapping has NOT been confirmed in the source document.
//       Update this file once the mapping is confirmed.
// Photo: replace `photo` with actual image path when available.

// Organizational structure — from company profile
export const orgStructure = [
  { role: { id: 'Direktur Utama',      en: 'President Director' }, order: 1 },
  { role: { id: 'Direktur',            en: 'Director'           }, order: 2 },
  { role: { id: 'Komisaris',           en: 'Commissioner'       }, order: 3 },
  { role: { id: 'Manager SDM',         en: 'HR Manager'         }, order: 4 },
  { role: { id: 'Manager Operasional', en: 'Operations Manager' }, order: 5 },
  { role: { id: 'HSE / K3',            en: 'HSE / K3'           }, order: 6 },
  { role: { id: 'Admin',               en: 'Admin'              }, order: 7 },
];

// Team members — names from company profile.
// [ROLE TO BE CONFIRMED] — role assignments not confirmed in source document.
export const teamMembers = [
  {
    id: 'narindra-seto',
    name: 'Narindra Seto',
    role: { id: '[JABATAN PERLU DIKONFIRMASI]', en: '[ROLE TO BE CONFIRMED]' },
    photo: null,
  },
  {
    id: 'mujiono',
    name: 'Mujiono',
    role: { id: '[JABATAN PERLU DIKONFIRMASI]', en: '[ROLE TO BE CONFIRMED]' },
    photo: null,
  },
  {
    id: 'mujianto',
    name: 'Mujianto',
    role: { id: '[JABATAN PERLU DIKONFIRMASI]', en: '[ROLE TO BE CONFIRMED]' },
    photo: null,
  },
  {
    id: 'fajar-dwi-prasetyo',
    name: 'Fajar Dwi Prasetyo',
    role: { id: '[JABATAN PERLU DIKONFIRMASI]', en: '[ROLE TO BE CONFIRMED]' },
    photo: null,
  },
  {
    id: 'eka-hari-s',
    name: 'Eka Hari S.',
    role: { id: '[JABATAN PERLU DIKONFIRMASI]', en: '[ROLE TO BE CONFIRMED]' },
    photo: null,
  },
  {
    id: 'syalsya',
    name: 'Syalsya',
    role: { id: '[JABATAN PERLU DIKONFIRMASI]', en: '[ROLE TO BE CONFIRMED]' },
    photo: null,
  },
  {
    id: 'siswoyo',
    name: 'Siswoyo',
    role: { id: '[JABATAN PERLU DIKONFIRMASI]', en: '[ROLE TO BE CONFIRMED]' },
    photo: null,
  },
];
