// src/pages/admin/ProjectForm.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  getProjectById,
  createProject,
  updateProject,
  uploadProjectImage,
} from '../../services/projectService';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowLeft,
  Save,
  UploadCloud,
  Image as ImageIcon,
  Star,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  Images,
  ImagePlus,
  Trash2,
  Plus
} from 'lucide-react';

const CATEGORY_OPTIONS = [
  { key: 'Construction', idLabel: 'Konstruksi',   enLabel: 'Construction' },
  { key: 'Development',  idLabel: 'Pengembangan', enLabel: 'Development' },
  { key: 'Project',      idLabel: 'Proyek',       enLabel: 'Project' },
  { key: 'Renovation',   idLabel: 'Renovasi',     enLabel: 'Renovation' },
  { key: 'MEP',          idLabel: 'MEP',          enLabel: 'MEP' },
];

export default function ProjectForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { isSupabaseConfigured } = useAuth();

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    location: '',
    category: 'Construction',
    categoryID: 'Konstruksi',
    description_id: '',
    description_en: '',
    image: '',
    featured: false,
    orderIndex: 0,
  });

  // Foto Utama (Cover)
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Galeri Foto Tambahan
  const [gallery, setGallery] = useState([]);
  const [manualGalleryUrl, setManualGalleryUrl] = useState('');
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEditMode);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load existing project data if in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    async function fetchProject() {
      setPageLoading(true);
      try {
        const project = await getProjectById(id);
        if (!project) {
          setErrorMessage('Proyek tidak ditemukan.');
          return;
        }

        setFormData({
          id: project.id,
          title: project.title,
          location: project.location || '',
          category: project.category || 'Construction',
          categoryID: project.categoryID || 'Konstruksi',
          description_id: project.description?.id || '',
          description_en: project.description?.en || '',
          image: project.image || '',
          featured: Boolean(project.featured),
          orderIndex: project.orderIndex || 0,
        });

        if (project.image) {
          setImagePreview(project.image);
        }

        if (Array.isArray(project.gallery)) {
          setGallery(project.gallery);
        }
      } catch (err) {
        setErrorMessage(err.message || 'Gagal memuat data proyek.');
      } finally {
        setPageLoading(false);
      }
    }

    fetchProject();
  }, [id, isEditMode]);

  // Handle title change and auto slug generator (only for create mode)
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => {
      const updated = { ...prev, title: val };
      if (!isEditMode && (!prev.id || prev.id === generateSlug(prev.title))) {
        updated.id = generateSlug(val);
      }
      return updated;
    });
  };

  const generateSlug = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleCategoryChange = (e) => {
    const selectedKey = e.target.value;
    const catObj = CATEGORY_OPTIONS.find((c) => c.key === selectedKey);
    setFormData((prev) => ({
      ...prev,
      category: selectedKey,
      categoryID: catObj ? catObj.idLabel : selectedKey,
    }));
  };

  // Handle Single Image Selection (Cover)
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG, PNG, WebP).');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle Multi-file Upload for Gallery
  const handleGalleryFilesChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter((f) => f.type.startsWith('image/'));
    if (validFiles.length < files.length) {
      alert('Beberapa file dilewati karena bukan file gambar.');
    }
    if (!validFiles.length) return;

    setIsUploadingGallery(true);
    setErrorMessage('');
    try {
      const uploadedUrls = [];
      for (const file of validFiles) {
        if (isSupabaseConfigured) {
          const url = await uploadProjectImage(file);
          uploadedUrls.push(url);
        } else {
          uploadedUrls.push(URL.createObjectURL(file));
        }
      }
      setGallery((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Gagal mengupload foto galeri.');
    } finally {
      setIsUploadingGallery(false);
      e.target.value = '';
    }
  };

  // Handle Add Manual URL to Gallery
  const handleAddManualGalleryUrl = () => {
    const trimmed = manualGalleryUrl.trim();
    if (!trimmed) return;
    setGallery((prev) => [...prev, trimmed]);
    setManualGalleryUrl('');
  };

  // Remove Gallery Item
  const handleRemoveGalleryItem = (index) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  // Set Gallery Item as Cover Image
  const handleSetGalleryAsCover = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
    setImagePreview(url);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      let finalImageUrl = formData.image;

      // Upload main image to Supabase if file selected
      if (imageFile) {
        if (isSupabaseConfigured) {
          setIsUploadingImage(true);
          finalImageUrl = await uploadProjectImage(imageFile);
          setIsUploadingImage(false);
        } else {
          finalImageUrl = imagePreview || formData.image;
        }
      }

      const payload = {
        ...formData,
        image: finalImageUrl,
        gallery: gallery,
      };

      if (isEditMode) {
        await updateProject(id, payload);
        setSuccessMessage('Proyek berhasil diperbarui!');
      } else {
        await createProject(payload);
        setSuccessMessage('Proyek baru berhasil ditambahkan!');
      }

      setTimeout(() => {
        navigate('/admin/projects');
      }, 1200);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Gagal menyimpan proyek.');
    } finally {
      setIsSubmitting(false);
      setIsUploadingImage(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="p-16 text-center text-white/40 text-xs">
        <div className="w-8 h-8 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin mx-auto mb-3" />
        Memuat data formulir...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ── TOP NAVIGATION ───────────────────────────────────── */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <Link
          to="/admin/projects"
          className="text-xs text-white/60 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Daftar Proyek</span>
        </Link>
        <span className="text-xs text-brand-gold font-bold uppercase tracking-wider">
          {isEditMode ? 'Mode Perbarui Proyek' : 'Mode Tambah Proyek'}
        </span>
      </div>

      {/* ── HEADER TITLE ─────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide uppercase">
          {isEditMode ? `Edit: ${formData.title || 'Proyek'}` : 'Tambah Proyek Baru'}
        </h1>
        <p className="text-white/50 text-xs sm:text-sm mt-1">
          Lengkapi detail proyek, foto dokumentasi & galeri, dan pengaturan tampilan.
        </p>
      </div>

      {/* ── ALERT MESSAGES ──────────────────────────────────── */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-start gap-3">
          <AlertCircle size={18} className="shrink-0 text-red-400 mt-0.5" />
          <div>
            <p className="font-bold">Terjadi Kesalahan</p>
            <p className="mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
          <p className="font-bold">{successMessage} Mengalihkan ke daftar proyek...</p>
        </div>
      )}

      {/* ── MAIN FORM ────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Box 1: Informasi Utama */}
        <div className="bg-[#14171e] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3">
            Informasi Dasar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Judul Proyek */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">
                Judul Proyek <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Contoh: Hotel SM Tower Malioboro"
                className="w-full px-4 py-2.5 bg-[#0a0c10] border border-white/15 rounded-lg text-sm text-white placeholder-white/25 focus:outline-none focus:border-brand-gold"
              />
            </div>

            {/* ID / Slug */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">
                Slug / URL ID <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                disabled={isEditMode}
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: generateSlug(e.target.value) })}
                placeholder="hotel-sm-tower-malioboro"
                className="w-full px-4 py-2.5 bg-[#0a0c10] border border-white/15 rounded-lg text-sm text-white/80 font-mono placeholder-white/25 focus:outline-none focus:border-brand-gold disabled:opacity-50"
              />
              <p className="text-[10px] text-white/40 mt-1">
                Akan menjadi URL publik: /portfolio/{formData.id || 'slug-proyek'}
              </p>
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">
                Kategori Pekerjaan <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2.5 bg-[#0a0c10] border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-brand-gold"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.idLabel} ({opt.enLabel})
                  </option>
                ))}
              </select>
            </div>

            {/* Lokasi */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">
                Lokasi Proyek
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Contoh: Ngampilan, Yogyakarta"
                className="w-full px-4 py-2.5 bg-[#0a0c10] border border-white/15 rounded-lg text-sm text-white placeholder-white/25 focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>
        </div>

        {/* Box 2: Deskripsi Proyek (Dua Bahasa) */}
        <div className="bg-[#14171e] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3">
            Deskripsi Proyek (Dua Bahasa)
          </h2>

          {/* Bahasa Indonesia */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">
              Deskripsi (Bahasa Indonesia)
            </label>
            <textarea
              rows={4}
              value={formData.description_id}
              onChange={(e) => setFormData({ ...formData, description_id: e.target.value })}
              placeholder="Jelaskan ruang lingkup proyek, keunggulan konstruksi, dan spesifikasi bangunan..."
              className="w-full px-4 py-2.5 bg-[#0a0c10] border border-white/15 rounded-lg text-sm text-white placeholder-white/25 focus:outline-none focus:border-brand-gold"
            />
          </div>

          {/* English */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">
              Description (English - Optional)
            </label>
            <textarea
              rows={3}
              value={formData.description_en}
              onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
              placeholder="Describe the scope of work and construction details in English..."
              className="w-full px-4 py-2.5 bg-[#0a0c10] border border-white/15 rounded-lg text-sm text-white placeholder-white/25 focus:outline-none focus:border-brand-gold"
            />
          </div>
        </div>

        {/* Box 3: FOTO UTAMA (COVER / THUMBNAIL) */}
        <div className="bg-[#14171e] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="border-b border-white/5 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              1. Foto Utama / Sampul Proyek (Cover Thumbnail)
            </h2>
            <p className="text-xs text-white/40 mt-0.5">
              Foto utama yang akan tampil pada kartu portofolio, daftar proyek, dan header halaman detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Upload Area */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">
                Upload Foto Sampul (Supabase Storage)
              </label>
              <div className="border-2 border-dashed border-white/20 hover:border-brand-gold rounded-xl p-6 text-center transition-colors bg-[#0a0c10]">
                <UploadCloud size={32} className="mx-auto text-brand-gold mb-3" />
                <p className="text-xs text-white/80 font-medium">
                  Klik untuk memilih gambar dari komputer
                </p>
                <p className="text-[10px] text-white/40 mt-1">PNG, JPG, JPEG, WebP (Maks. 5MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="project-image-input"
                />
                <label
                  htmlFor="project-image-input"
                  className="mt-4 inline-block px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                >
                  Pilih File Sampul
                </label>
              </div>

              {/* Atau isi URL manual */}
              <div className="mt-4">
                <label className="block text-[11px] font-semibold text-white/50 mb-1.5 flex items-center gap-1">
                  <LinkIcon size={12} /> Atau Gunakan URL Gambar Manual
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => {
                    setFormData({ ...formData, image: e.target.value });
                    if (!imageFile) setImagePreview(e.target.value);
                  }}
                  placeholder="/images/projects/nama-file.jpg atau https://..."
                  className="w-full px-3 py-2 bg-[#0a0c10] border border-white/15 rounded-lg text-xs text-white placeholder-white/25 focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            {/* Preview Box */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">
                Pratinjau Foto Sampul (Cover Preview)
              </label>
              <div className="aspect-[4/3] rounded-xl bg-[#0a0c10] border border-white/15 overflow-hidden flex items-center justify-center relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Pratinjau proyek"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '';
                    }}
                  />
                ) : (
                  <div className="text-center text-white/30 p-4">
                    <ImageIcon size={36} className="mx-auto mb-2 opacity-50" />
                    <p className="text-xs">Belum ada foto sampul yang dipilih</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Box 4: GALERI FOTO DOKUMENTASI (MULTIPLE IMAGES) */}
        <div className="bg-[#14171e] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Images size={18} className="text-brand-gold" />
                <span>2. Galeri Foto Dokumentasi Proyek</span>
              </h2>
              <p className="text-xs text-white/40 mt-0.5">
                Foto-foto tambahan (proses konstruksi, interior, fasilitas) yang akan tampil di grid galeri halaman detail proyek.
              </p>
            </div>
            <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20 self-start sm:self-auto">
              {gallery.length} Foto Tersimpan
            </span>
          </div>

          {/* Action Bar: Upload Multi & Input Manual URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Multi Upload Button */}
            <div className="p-4 rounded-xl bg-[#0a0c10] border border-white/10 flex flex-col justify-between space-y-3">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Upload Banyak Foto ke Galeri
                </label>
                <p className="text-[11px] text-white/40">
                  Pilih satu atau beberapa foto sekaligus dari perangkat Anda.
                </p>
              </div>

              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryFilesChange}
                  disabled={isUploadingGallery}
                  className="hidden"
                  id="gallery-files-input"
                />
                <label
                  htmlFor="gallery-files-input"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    isUploadingGallery
                      ? 'bg-white/10 text-white/50 cursor-not-allowed'
                      : 'bg-brand-gold hover:bg-[#d9b85c] text-brand-darkblack shadow-md'
                  }`}
                >
                  {isUploadingGallery ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-brand-darkblack/30 border-t-brand-darkblack rounded-full animate-spin" />
                      <span>Mengunggah Foto Galeri...</span>
                    </>
                  ) : (
                    <>
                      <ImagePlus size={16} />
                      <span>Pilih Foto Galeri (Bisa Banyak)</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Manual URL Input */}
            <div className="p-4 rounded-xl bg-[#0a0c10] border border-white/10 flex flex-col justify-between space-y-3">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Atau Tambah URL Gambar ke Galeri
                </label>
                <p className="text-[11px] text-white/40">
                  Masukkan link gambar publik (misal: /images/projects/... atau https://...)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={manualGalleryUrl}
                  onChange={(e) => setManualGalleryUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddManualGalleryUrl();
                    }
                  }}
                  placeholder="https://... atau /images/projects/foto.jpg"
                  className="flex-1 px-3 py-2 bg-[#14171e] border border-white/15 rounded-lg text-xs text-white placeholder-white/25 focus:outline-none focus:border-brand-gold"
                />
                <button
                  type="button"
                  onClick={handleAddManualGalleryUrl}
                  disabled={!manualGalleryUrl.trim()}
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shrink-0"
                >
                  <Plus size={14} />
                  <span>Tambah</span>
                </button>
              </div>
            </div>
          </div>

          {/* Gallery Preview Grid */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">
              Daftar Foto Galeri ({gallery.length})
            </label>

            {gallery.length === 0 ? (
              <div className="p-8 rounded-xl bg-[#0a0c10] border border-white/10 text-center text-white/40 text-xs">
                <Images size={28} className="mx-auto mb-2 opacity-40 text-brand-gold" />
                <p className="font-semibold text-white/70">Belum ada foto galeri tambahan</p>
                <p className="text-[11px] text-white/40 mt-0.5">
                  Foto galeri yang diupload di sini akan ditampilkan dalam grid foto interaktif pada halaman detail proyek.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {gallery.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square rounded-lg bg-[#0a0c10] border border-white/15 overflow-hidden hover:border-brand-gold/60 transition-all shadow-md"
                  >
                    <img
                      src={imgUrl}
                      alt={`Foto galeri ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.opacity = '0.3';
                      }}
                    />

                    {/* Badge Nomor Urut */}
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-bold text-white/90">
                      #{index + 1}
                    </div>

                    {/* Overlay Action Buttons */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                      <button
                        type="button"
                        onClick={() => handleSetGalleryAsCover(imgUrl)}
                        className="p-2 rounded-lg bg-brand-gold/90 hover:bg-brand-gold text-brand-darkblack shadow transition-all"
                        title="Jadikan Foto Sampul Utama"
                      >
                        <Star size={14} className="fill-brand-darkblack" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryItem(index)}
                        className="p-2 rounded-lg bg-red-600 hover:bg-red-500 text-white shadow transition-all"
                        title="Hapus dari Galeri"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Box 5: Pengaturan Tambahan */}
        <div className="bg-[#14171e] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3">
            Opsi Tampilan
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0a0c10] border border-white/10">
            <div className="flex items-start gap-3">
              <Star size={20} className={formData.featured ? 'text-amber-400 fill-amber-400' : 'text-white/40'} />
              <div>
                <p className="text-xs font-bold text-white">Jadikan Proyek Unggulan (Featured)</p>
                <p className="text-[11px] text-white/50 mt-0.5">
                  Proyek ini akan ditampilkan di section Portofolio Unggulan pada Halaman Utama (Home).
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gold"></div>
            </label>
          </div>
        </div>

        {/* ── ACTION BUTTONS ──────────────────────────────────── */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            to="/admin/projects"
            className="px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 text-xs font-semibold transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || isUploadingImage || isUploadingGallery}
            className="px-6 py-3 rounded-lg bg-brand-gold hover:bg-[#d9b85c] disabled:opacity-50 text-brand-darkblack text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-brand-gold/20 transition-all flex items-center gap-2"
          >
            {isSubmitting || isUploadingImage || isUploadingGallery ? (
              <>
                <div className="w-4 h-4 border-2 border-brand-darkblack/30 border-t-brand-darkblack rounded-full animate-spin" />
                <span>
                  {isUploadingImage
                    ? 'Mengupload Foto Sampul...'
                    : isUploadingGallery
                    ? 'Mengupload Foto Galeri...'
                    : 'Menyimpan...'}
                </span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>{isEditMode ? 'Simpan Perubahan' : 'Terbitkan Proyek'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

