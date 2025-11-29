import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NeoButton from './NeoButton.tsx';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'bg-black text-white' : '';

  return (
    <nav className="sticky top-0 z-50 bg-[#fdf6e3] text-black border-b-2 border-black p-3 flex flex-wrap justify-between items-center gap-3">
      <Link to="/" className="text-lg font-black uppercase tracking-tight hover:text-[#ff6b6b] transition-colors">
        EASY TOOLS TOWN 🛠️
      </Link>
      <div className="flex gap-1.5 flex-wrap">
        <Link to="/tools"><NeoButton className={`text-xs py-1.5 px-3 ${isActive('/tools')}`} variant="secondary">All Tools</NeoButton></Link>
        <Link to="/tools/docx"><NeoButton className={`text-xs py-1.5 px-3 ${isActive('/tools/docx')}`} variant="primary">DOCX</NeoButton></Link>
        <Link to="/blog"><NeoButton className={`text-xs py-1.5 px-3 ${isActive('/blog')}`} variant="accent">Blog</NeoButton></Link>
        <Link to="/contact"><NeoButton className={`text-xs py-1.5 px-3 ${isActive('/contact')}`} variant="danger">Contact</NeoButton></Link>
      </div>
    </nav>
  );
};

export default Navbar;