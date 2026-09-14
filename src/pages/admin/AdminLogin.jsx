// src/pages/admin/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import logoImg from '../../assets/logo-gold.jpeg';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { signIn, isSupabaseConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setErrorMsg(error.message || 'Login gagal. Periksa kembali email dan kata sandi Anda.');
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem saat mencoba login.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('admin@mitrabumi.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-[#0a0c0f] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans selection:bg-brand-gold selection:text-brand-darkblack">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-xs text-white/50 hover:text-white flex items-center gap-1.5 transition-colors py-2 px-3 rounded-lg bg-white/5 border border-white/10"
      >
        <ArrowLeft size={14} />
        <span>Kembali ke Website</span>
      </Link>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Card Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-2 rounded-2xl bg-white/5 border border-white/10 mb-4 shadow-xl">
            <img src={logoImg} alt="PT Mitra Bumi Rejeki" className="h-16 w-16 object-cover rounded-xl" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide uppercase">PORTAL ADMIN</h1>
          <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold mt-1 flex items-center justify-center gap-1">
            <ShieldCheck size={14} /> PT Mitra Bumi Rejeki
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-[#14171e]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
              <p className="leading-relaxed">{errorMsg}</p>
            </div>
          )}

          {!isSupabaseConfigured && (
            <div className="mb-6 p-3 rounded-lg bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs">
              <p className="font-bold mb-1">💡 Demo Mode Aktif</p>
              <p className="text-white/70 text-[11px] leading-relaxed mb-2">
                Supabase belum terhubung di <code className="text-brand-gold">.env</code>. Klik tombol di bawah untuk mengisi akun demo uji coba:
              </p>
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-[11px] underline hover:text-white font-semibold"
              >
                Gunakan Akun Demo (admin@mitrabumi.com)
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                Email Admin
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0a0c10] border border-white/15 rounded-lg text-sm text-white placeholder-white/25 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#0a0c10] border border-white/15 rounded-lg text-sm text-white placeholder-white/25 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white/80"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-brand-gold hover:bg-[#d9b85c] disabled:opacity-50 text-brand-darkblack font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg hover:shadow-brand-gold/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-brand-darkblack/30 border-t-brand-darkblack rounded-full animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <span>Masuk ke Dashboard</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-white/30 text-[11px] mt-6">
          Sistem Terproteksi Khusus Administrator &bull; PT Mitra Bumi Rejeki
        </p>
      </div>
    </div>
  );
}
