// src/services/projectService.js
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { projects as fallbackProjects } from '../data/projects';

// Helper to normalize Supabase project row to match component data structure
export function normalizeProject(row) {
  if (!row) return null;
  const isSkyArmor = row.id === 'sky-amor-agency' || row.id === 'sky-armor-regency' || row.title === 'Sky Amor Agency';
  const title = isSkyArmor ? 'Sky Armor Regency' : row.title;
  let descId = row.description_id || '';
  let descEn = row.description_en || row.description_id || '';
  if (isSkyArmor) {
    descId = descId.replace(/Sky Amor Agency/gi, 'Sky Armor Regency');
    descEn = descEn.replace(/Sky Amor Agency/gi, 'Sky Armor Regency');
  }

  return {
    id: row.id,
    title,
    location: row.location || '',
    category: row.category || 'Construction',
    categoryID: row.category_id || 'Konstruksi',
    description: {
      id: descId,
      en: descEn,
    },
    image: row.image || '',
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    scopeOfWork: row.scope_of_work || null,
    featured: Boolean(row.featured),
    orderIndex: row.order_index || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// 1. Ambil semua proyek (dengan fallback otomatis ke projects.js)
export async function getProjects() {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackProjects;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[projectService] Gagal fetch dari Supabase, menggunakan data fallback:', error.message);
      return fallbackProjects;
    }

    if (!data || data.length === 0) {
      return fallbackProjects;
    }

    return data.map(normalizeProject);
  } catch (err) {
    console.warn('[projectService] Terjadi kesalahan koneksi, fallback digunakan:', err);
    return fallbackProjects;
  }
}

// 2. Ambil detail satu proyek berdasarkan ID (slug)
export async function getProjectById(id) {
  const isMatch = (pId, targetId) =>
    pId === targetId ||
    (targetId === 'sky-amor-agency' && pId === 'sky-armor-regency') ||
    (targetId === 'sky-armor-regency' && pId === 'sky-amor-agency');

  if (!isSupabaseConfigured || !supabase) {
    return fallbackProjects.find(p => isMatch(p.id, id)) || null;
  }

  try {
    let { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (!data && (id === 'sky-armor-regency' || id === 'sky-amor-agency')) {
      const altId = id === 'sky-armor-regency' ? 'sky-amor-agency' : 'sky-armor-regency';
      const altRes = await supabase.from('projects').select('*').eq('id', altId).maybeSingle();
      if (altRes.data) data = altRes.data;
    }

    if (!data) {
      return fallbackProjects.find(p => isMatch(p.id, id)) || null;
    }

    return normalizeProject(data);
  } catch (err) {
    console.warn('[projectService] Gagal getProjectById dari Supabase:', err);
    return fallbackProjects.find(p => isMatch(p.id, id)) || null;
  }
}

// 3. Upload Foto ke Supabase Storage (Bucket: project-images)
export async function uploadProjectImage(file) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase belum dikonfigurasi. Harap isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env');
  }

  // Generate nama file unik dengan timestamp & sanitasi
  const fileExt = file.name.split('.').pop();
  const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  const fileName = `${Date.now()}_${cleanName.slice(0, 20)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('project-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  // Dapatkan URL publik dari file yang baru diupload
  const { data: publicUrlData } = supabase.storage
    .from('project-images')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

// 4. Tambah Proyek Baru (Create)
export async function createProject(projectInput) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase belum dikonfigurasi. Harap isi file .env terlebih dahulu.');
  }

  // Generate ID/slug dari judul jika tidak ada
  const slug = projectInput.id
    ? projectInput.id.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : projectInput.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const row = {
    id: slug,
    title: projectInput.title,
    location: projectInput.location || '',
    category: projectInput.category || 'Construction',
    category_id: projectInput.categoryID || 'Konstruksi',
    description_id: projectInput.description?.id || projectInput.description_id || '',
    description_en: projectInput.description?.en || projectInput.description_en || '',
    image: projectInput.image || '',
    gallery: projectInput.gallery || [],
    scope_of_work: projectInput.scopeOfWork || null,
    featured: Boolean(projectInput.featured),
    order_index: projectInput.orderIndex || 0,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('projects')
    .insert([row])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return normalizeProject(data);
}

// 5. Ubah Proyek (Update)
export async function updateProject(id, projectInput) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase belum dikonfigurasi. Harap isi file .env terlebih dahulu.');
  }

  const row = {
    title: projectInput.title,
    location: projectInput.location,
    category: projectInput.category,
    category_id: projectInput.categoryID,
    description_id: projectInput.description?.id ?? projectInput.description_id,
    description_en: projectInput.description?.en ?? projectInput.description_en,
    image: projectInput.image,
    gallery: projectInput.gallery,
    scope_of_work: projectInput.scopeOfWork,
    featured: Boolean(projectInput.featured),
    order_index: projectInput.orderIndex ?? 0,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('projects')
    .update(row)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return normalizeProject(data);
}

// 6. Hapus Proyek (Delete)
export async function deleteProject(id) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase belum dikonfigurasi. Harap isi file .env terlebih dahulu.');
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return true;
}
