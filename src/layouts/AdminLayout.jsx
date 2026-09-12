// src/layouts/AdminLayout.jsx
import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Building2,
  AlertTriangle
} from 'lucide-react';
import logoImg from '../assets/logo-gold.jpeg';

const SIDEBAR_W = 'w-64'; // 16rem

export default function AdminLayout() {
  const { user, signOut, isSupabaseConfigured } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Daftar Proyek', path: '/admin/projects', icon: FolderKanban, end: true },
    { name: 'Tambah Proyek', path: '/admin/projects/new', icon: PlusCircle, end: false },
  ];

  return (
    <div className="h-screen overflow-hidden bg-[#0d0f12] text-slate-100 flex flex-col md:flex-row font-sans selection:bg-brand-gold selection:text-brand-darkblack">
      {/* ── MOBILE TOPBAR ────────────────────────────────────── */}
      <div className="md:hidden bg-[#14171d] border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="PT Mitra Bumi Rejeki" className="h-8 w-8 object-cover rounded" />
          <span className="font-bold text-sm text-white tracking-wide">ADMIN PORTAL</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-white/70 hover:text-white rounded-lg bg-white/5 border border-white/10"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── SIDEBAR ─────────────────────────────────────────── */}
      <aside
        className={`fixed top-0 left-0 h-screen ${SIDEBAR_W} bg-[#14171d] border-r border-white/10 flex flex-col justify-between z-40 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="p-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="PT Mitra Bumi Rejeki" className="h-10 w-10 object-cover rounded shadow" />
            <div>
              <h2 className="font-black text-sm text-white tracking-wider uppercase leading-none">Mitra Bumi</h2>
              <p className="text-[10px] text-brand-gold uppercase tracking-widest font-semibold mt-1 flex items-center gap-1">
                <ShieldCheck size={12} /> Admin Area
              </p>
            </div>
          </div>
        </div>

        {/* Supabase Status Alert if not configured */}
        {!isSupabaseConfigured && (
          <div className="mx-4 mt-4 p-3 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2 shrink-0">
            <AlertTriangle size={16} className="shrink-0 mt-0.5 text-amber-400" />
            <div>
              <p className="font-bold">Mode Demo Lokal</p>
              <p className="text-[11px] text-amber-200/80 mt-0.5">
                Supabase belum terhubung di .env. Data tersimpan di memory fallback.
              </p>
            </div>
          </div>
        )}

        {/* Nav Links */}
        <div className="p-4 flex-1 space-y-1.5 overflow-y-auto">
          <div className="text-[10px] font-bold text-white/40 tracking-wider uppercase px-3 mb-2">
            Menu Manajemen
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-brand-gold text-brand-darkblack shadow-md font-bold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/5 text-[10px] font-bold text-white/40 tracking-wider uppercase px-3 mb-2">
            Website Publik
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-3">
              <Building2 size={18} />
              <span>Buka Website</span>
            </span>
            <ExternalLink size={14} className="opacity-50" />
          </a>
        </div>

        {/* User profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-8 h-8 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold text-xs font-bold">
              {user?.email ? user.email.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user?.email || 'admin@mitrabumi.com'}</p>
              <p className="text-[10px] text-brand-gold truncate">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg border border-red-500/20 transition-all"
          >
            <LogOut size={14} />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
        />
      )}

      {/* ── MAIN CONTENT AREA ────────────────────────────────── */}
      {/* On md+, offset by sidebar width so content doesn't sit behind the fixed sidebar */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto md:ml-64">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

