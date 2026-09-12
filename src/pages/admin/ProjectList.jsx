// src/pages/admin/ProjectList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, deleteProject } from '../../services/projectService';
import { useAuth } from '../../context/AuthContext';
import {
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  Star,
  AlertTriangle,
  CheckCircle2,
  X,
  SearchX,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  FolderPlus
} from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function ProjectList() {
  const { isSupabaseConfigured } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // State untuk modal konfirmasi hapus
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    project: null,
    isDeleting: false,
  });

  // State notifikasi
  const [toast, setToast] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Reset pagination on search or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const confirmDelete = (project) => {
    setDeleteModal({ isOpen: true, project, isDeleting: false });
  };

  const handleDelete = async () => {
    if (!deleteModal.project) return;
    setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

    try {
      await deleteProject(deleteModal.project.id);
      showToast(`Proyek "${deleteModal.project.title}" berhasil dihapus.`, 'success');
      // Update local state directly
      setProjects((prev) => prev.filter((p) => p.id !== deleteModal.project.id));
      setDeleteModal({ isOpen: false, project: null, isDeleting: false });
    } catch (err) {
      showToast(err.message || 'Gagal menghapus proyek.', 'error');
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  // Filter projects by search and category
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.location && p.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.id && p.id.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' ||
      p.category === selectedCategory ||
      p.categoryID === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* ── TOAST NOTIFICATION ───────────────────────────────── */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl border shadow-2xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-bottom-5 ${
          toast.type === 'success'
            ? 'bg-emerald-950 border-emerald-500/30 text-emerald-200'
            : 'bg-red-950 border-red-500/30 text-red-200'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={16} className="text-emerald-400" /> : <AlertTriangle size={16} className="text-red-400" />}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-white/50 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* ── HEADER ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide uppercase">
            MANAJEMEN PORTOFOLIO
          </h1>
          <p className="text-white/50 text-xs sm:text-sm mt-1">
            Kelola data proyek konstruksi, foto dokumentasi, dan status unggulan.
          </p>
        </div>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-gold hover:bg-[#d9b85c] text-brand-darkblack font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg hover:shadow-brand-gold/20 transition-all self-start sm:self-auto"
        >
          <PlusCircle size={16} />
          <span>Tambah Proyek Baru</span>
        </Link>
      </div>

      {/* ── SEARCH & FILTER CONTROLS (STICKY) ─────────────────── */}
      <div className="sticky top-0 z-20 bg-[#0d0f12]/95 backdrop-blur-md py-2 -my-2">
        <div className="bg-[#14171e] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari judul, lokasi, atau ID..."
              className="w-full pl-9 pr-8 py-2 bg-[#0a0c10] border border-white/15 rounded-lg text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-gold transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-white/40 hover:text-white"
                title="Hapus kata kunci"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Filter & Reset */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={14} className="text-white/40 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#0a0c10] border border-white/15 rounded-lg text-xs text-white px-3 py-2 focus:outline-none focus:border-brand-gold w-full sm:w-auto transition-colors"
            >
              <option value="all">Semua Kategori</option>
              <option value="Construction">Konstruksi (Construction)</option>
              <option value="Development">Pengembangan (Development)</option>
              <option value="Project">Proyek Khusus (Project)</option>
              <option value="Renovation">Renovasi (Renovation)</option>
              <option value="MEP">Mekanikal & Elektrikal (MEP)</option>
            </select>

            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={resetFilters}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors shrink-0"
                title="Reset pencarian dan filter"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── TABLE CONTAINER ──────────────────────────────────── */}
      <div className="bg-[#14171e] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-16 text-center text-white/40 text-xs">
            <div className="w-8 h-8 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin mx-auto mb-3" />
            Memuat daftar proyek...
          </div>
        ) : projects.length === 0 ? (
          /* Empty State saat database benar-benar belum ada data */
          <div className="p-16 text-center text-white/50 flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold mb-1">
              <FolderPlus size={24} />
            </div>
            <h3 className="text-base font-bold text-white">Belum Ada Proyek</h3>
            <p className="text-xs text-white/40 max-w-sm">
              Katalog portofolio masih kosong. Mulai tambahkan proyek konstruksi atau pengembangan pertama Anda.
            </p>
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2 mt-2 bg-brand-gold hover:bg-[#d9b85c] text-brand-darkblack font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
            >
              <PlusCircle size={15} />
              <span>Tambah Proyek Pertama</span>
            </Link>
          </div>
        ) : filteredProjects.length === 0 ? (
          /* Empty State saat pencarian/filter tidak menemukan hasil */
          <div className="p-16 text-center text-white/50 flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 mb-1">
              <SearchX size={24} />
            </div>
            <h3 className="text-base font-bold text-white">Proyek Tidak Ditemukan</h3>
            <p className="text-xs text-white/40 max-w-sm leading-relaxed">
              Tidak ada proyek yang sesuai dengan pencarian{' '}
              {searchTerm && <span className="text-white font-semibold">"{searchTerm}"</span>}
              {searchTerm && selectedCategory !== 'all' && ' pada '}
              {selectedCategory !== 'all' && (
                <span>
                  kategori <span className="text-white font-semibold">"{selectedCategory}"</span>
                </span>
              )}
              . Coba ubah kata kunci atau reset filter.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 mt-2 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-lg transition-colors border border-white/15"
            >
              <RotateCcw size={14} />
              <span>Reset Pencarian & Filter</span>
            </button>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-white/80">
                <thead className="bg-white/[0.03] text-white/50 uppercase tracking-wider text-[10px] border-b border-white/10">
                  <tr>
                    <th className="px-5 py-3.5">Proyek & ID</th>
                    <th className="px-5 py-3.5">Kategori</th>
                    <th className="px-5 py-3.5">Lokasi</th>
                    <th className="px-5 py-3.5 text-center">Tampilan Home</th>
                    <th className="px-5 py-3.5 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {paginatedProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Thumbnail & Title */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-14 h-11 rounded-lg bg-black/40 border border-white/10 overflow-hidden shrink-0 relative">
                            {project.image ? (
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-white/30 font-bold">
                                N/A
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">{project.title}</div>
                            <div className="text-[10px] text-white/40 font-mono mt-0.5">{project.id}</div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded text-[10px] font-semibold bg-white/5 border border-white/10 text-white/80">
                          {project.categoryID || project.category}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="px-5 py-4 text-white/60">
                        {project.location || '-'}
                      </td>

                      {/* Featured (Tampilan Home) */}
                      <td className="px-5 py-4 text-center">
                        {project.featured ? (
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm"
                            title="Proyek ini diunggulkan dan ditampilkan di halaman Beranda website publik"
                          >
                            <Star size={11} className="fill-amber-400 text-amber-400 shrink-0" />
                            <span>Ditampilkan di Beranda</span>
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] text-white/40 font-medium bg-white/5 border border-white/10"
                            title="Proyek standar — hanya tampil di katalog Portofolio"
                          >
                            Reguler (Portofolio saja)
                          </span>
                        )}
                      </td>

                      {/* Action buttons */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/portfolio/${project.id}`}
                            target="_blank"
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                            title="Lihat di Website Publik"
                            aria-label="Lihat di Website Publik"
                          >
                            <ExternalLink size={15} />
                          </Link>
                          <Link
                            to={`/admin/projects/edit/${project.id}`}
                            className="p-2 rounded-lg bg-brand-gold/10 hover:bg-brand-gold border border-brand-gold/30 text-brand-gold hover:text-brand-darkblack transition-colors"
                            title="Edit Proyek"
                            aria-label="Edit Proyek"
                          >
                            <Edit size={15} />
                          </Link>
                          <button
                            onClick={() => confirmDelete(project)}
                            className="p-2 rounded-lg bg-red-500/15 hover:bg-red-600 border border-red-500/30 text-red-400 hover:text-white transition-colors"
                            title="Hapus Proyek"
                            aria-label="Hapus Proyek"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── PAGINATION BAR ───────────────────────────────── */}
            <div className="p-4 border-t border-white/10 bg-white/[0.01] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
              <div>
                Menampilkan{' '}
                <span className="font-bold text-white">{startIndex + 1}</span> -{' '}
                <span className="font-bold text-white">
                  {Math.min(endIndex, filteredProjects.length)}
                </span>{' '}
                dari <span className="font-bold text-white">{filteredProjects.length}</span> proyek
                {filteredProjects.length < projects.length && (
                  <span className="text-white/40"> (difilter dari total {projects.length})</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safeCurrentPage === 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all text-xs font-semibold"
                >
                  <ChevronLeft size={14} />
                  <span>Sebelumnya</span>
                </button>

                <span className="px-2 text-xs text-white/70 font-medium">
                  Halaman <span className="font-bold text-white">{safeCurrentPage}</span> /{' '}
                  <span className="font-bold text-white">{totalPages}</span>
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safeCurrentPage === totalPages}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all text-xs font-semibold"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── MODAL KONFIRMASI HAPUS ────────────────────────────── */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#181b22] border border-white/15 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <Trash2 size={20} />
              </div>
              <h3 className="text-base font-bold text-white">Konfirmasi Hapus Proyek</h3>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              Apakah Anda yakin ingin menghapus proyek{' '}
              <strong className="text-white underline">{deleteModal.project?.title}</strong>?
              Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="pt-3 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={deleteModal.isDeleting}
                onClick={() => setDeleteModal({ isOpen: false, project: null, isDeleting: false })}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 text-xs font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={deleteModal.isDeleting}
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                {deleteModal.isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <span>Ya, Hapus Proyek</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

