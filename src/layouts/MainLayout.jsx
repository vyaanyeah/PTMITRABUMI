import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite">
      <Navbar />
      <main id="main-content" className="flex-1" role="main">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
