// src/App.jsx
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import Home          from './pages/Home';
import About         from './pages/About';
import Services      from './pages/Services';
import Portfolio     from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Contact       from './pages/Contact';

// Admin Area
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout    from './layouts/AdminLayout';
import AdminLogin     from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectList    from './pages/admin/ProjectList';
import ProjectForm    from './pages/admin/ProjectForm';

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      delay: 0,
    });
  }, []);

  return (
    <HelmetProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* ── ADMIN LOGIN ── */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* ── ADMIN PROTECTED ROUTES ── */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="projects" element={<ProjectList />} />
                <Route path="projects/new" element={<ProjectForm />} />
                <Route path="projects/edit/:id" element={<ProjectForm />} />
              </Route>

              {/* ── PUBLIC PAGES ── */}
              <Route element={<MainLayout />}>
                <Route path="/"                  element={<Home />}          />
                <Route path="/about"             element={<About />}         />
                <Route path="/services"          element={<Services />}      />
                <Route path="/portfolio"         element={<Portfolio />}     />
                <Route path="/portfolio/:id"     element={<ProjectDetail />} />
                <Route path="/contact"           element={<Contact />}       />
                {/* Catch-all fallback */}
                <Route path="*"                  element={<Home />}          />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

