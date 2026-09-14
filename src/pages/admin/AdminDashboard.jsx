// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../services/projectService';
import { useAuth } from '../../context/AuthContext';
import {
  FolderKanban,
  Star,
  Layers,
  Database,
  ArrowRight,
  ExternalLink,
  Edit,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, isSupabaseConfigured } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getProjects();
        setProjects(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalCount = projects.length;
  const featuredCount = projects.filter(p => p.featured).length;
  const constructionCount = projects.filter(p => p.category === 'Construction').length;
  const developmentCount = projects.filter(p => p.category === 'Development').length;

  return (
    <div className="space-y-8">
      {/* ── HEADER ───────────────────────────────────────────── */}
      <div className="pb-6 border-b border-white/10">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
          DASHBOARD ADMIN
        </h1>
        <p className="text-white/50 text-xs sm:text-sm mt-1">
          Selamat datang kembali, <span className="text-brand-gold font-semibold">{user?.email}</span>
        </p>
      </div>

      {/* ── STATUS BANNER (Hanya ditampilkan jika koneksi database terputus / fallback) ── */}
      {!isSupabaseConfigured && (
        <div className="p-4 rounded-xl border flex items-start sm:items-center justify-between gap-4 bg-amber-500/10 border-amber-500/20 text-amber-300">
          <div className="flex items-start sm:items-center gap-3">
            <AlertCircle size={20} className="shrink-0 text-amber-400 mt-0.5 sm:mt-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">
                Mode Fallback / Demo Lokal
              </p>
              <p className="text-[11px] opacity-80 mt-0.5">
                Variabel VITE_SUPABASE_URL belum terisi di .env. Menggunakan data statis bawaan projects.js.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/30">
            Fallback Active
          </span>
        </div>
      )}

      {/* ── METRIC CARDS ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Proyek */}
        <div className="bg-[#14171e] border border-white/10 rounded-xl p-5 relative overflow-hidden group hover:border-brand-gold/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">Total Proyek</span>
            <div className="p-2 rounded-lg bg-white/5 text-brand-gold">
              <FolderKanban size={20} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white tracking-tight">
              {loading ? '...' : totalCount}
            </span>
            <p className="text-[11px] text-white/40 mt-1">Tersimpan di katalog portofolio</p>
          </div>
        </div>

        {/* Card 2: Proyek Unggulan */}
        <div className="bg-[#14171e] border border-white/10 rounded-xl p-5 relative overflow-hidden group hover:border-brand-gold/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">Unggulan (Home)</span>
            <div className="p-2 rounded-lg bg-white/5 text-amber-400">
              <Star size={20} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white tracking-tight">
              {loading ? '...' : featuredCount}
            </span>
            <p className="text-[11px] text-white/40 mt-1">Ditampilkan di beranda website</p>
          </div>
        </div>

        {/* Card 3: Bidang Konstruksi */}
        <div className="bg-[#14171e] border border-white/10 rounded-xl p-5 relative overflow-hidden group hover:border-brand-gold/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">Konstruksi</span>
            <div className="p-2 rounded-lg bg-white/5 text-blue-400">
              <Layers size={20} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white tracking-tight">
              {loading ? '...' : constructionCount}
            </span>
            <p className="text-[11px] text-white/40 mt-1">Proyek kategori Konstruksi</p>
          </div>
        </div>

        {/* Card 4: Pengembangan / Kawasan */}
        <div className="bg-[#14171e] border border-white/10 rounded-xl p-5 relative overflow-hidden group hover:border-brand-gold/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50">Pengembangan</span>
            <div className="p-2 rounded-lg bg-white/5 text-emerald-400">
              <Database size={20} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white tracking-tight">
              {loading ? '...' : developmentCount}
            </span>
            <p className="text-[11px] text-white/40 mt-1">Kawasan & Perumahan</p>
          </div>
        </div>
      </div>

      {/* ── RECENT PROJECTS LIST ──────────────────────────────── */}
      <div className="bg-[#14171e] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">Daftar Proyek Terkini</h2>
            <p className="text-xs text-white/40 mt-0.5">Semua data proyek yang saat ini aktif</p>
          </div>
          <Link
            to="/admin/projects"
            className="text-xs font-semibold text-brand-gold hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Kelola Semua ({totalCount})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center text-white/40 text-xs">
            <div className="w-8 h-8 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin mx-auto mb-3" />
            Memuat data proyek...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-white/40 text-xs">
            Belum ada proyek terdaftar. Tambahkan proyek baru melalui menu di sidebar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/80">
              <thead className="bg-white/[0.03] text-white/50 uppercase tracking-wider text-[10px] border-b border-white/10">
                <tr>
                  <th className="px-5 py-3">Proyek</th>
                  <th className="px-5 py-3">Kategori</th>
                  <th className="px-5 py-3">Lokasi</th>
                  <th className="px-5 py-3 text-center">Status Unggulan</th>
                  <th className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.slice(0, 6).map((project) => (
                  <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 flex items-center gap-3">
                      <div className="w-10 h-8 rounded bg-black/40 border border-white/10 overflow-hidden shrink-0">
                        {project.image ? (
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-white/30 font-bold">
                            N/A
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-white hover:text-brand-gold transition-colors">
                          {project.title}
                        </div>
                        <div className="text-[10px] text-white/40 font-mono">{project.id}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 border border-white/10 text-white/70">
                        {project.categoryID || project.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-white/60">{project.location || '-'}</td>
                    <td className="px-5 py-3.5 text-center">
                      {project.featured ? (
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          title="Proyek ini diunggulkan dan ditampilkan di halaman Beranda website publik"
                        >
                          <Star size={10} className="fill-amber-400 text-amber-400 shrink-0" />
                          <span>Ditampilkan di Beranda</span>
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] text-white/40 font-medium bg-white/5 border border-white/10"
                          title="Proyek reguler — hanya tampil di katalog Portofolio"
                        >
                          Reguler
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/portfolio/${project.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/60 hover:text-white transition-colors"
                          title="Lihat di Website Publik"
                        >
                          <ExternalLink size={14} />
                        </Link>
                        <Link
                          to={`/admin/projects/edit/${project.id}`}
                          className="p-1.5 rounded-lg bg-brand-gold/10 hover:bg-brand-gold border border-brand-gold/30 text-brand-gold hover:text-brand-darkblack transition-colors"
                          title="Edit Proyek"
                        >
                          <Edit size={14} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
