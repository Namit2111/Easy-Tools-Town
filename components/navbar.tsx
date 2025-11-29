import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NeoButton from './NeoButton.tsx';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'bg-black text-white' : '';

  return (
    <nav className="sticky top-0 z-50 bg-[#fdf6e3] text-black border-b-3 border-black p-4 flex flex-wrap justify-between items-center gap-4">
      <Link to="/" className="text-2xl font-black uppercase tracking-tight hover:text-[#ff6b6b] transition-colors">
        EASY TOOLS TOWN 🛠️
      </Link>
      <div className="flex gap-2 flex-wrap">
        <Link to="/tools"><NeoButton className={`${isActive('/tools')}`} variant="secondary">All Tools</NeoButton></Link>
        <Link to="/tools/docx"><NeoButton className={`${isActive('/tools/docx')}`} variant="primary">DOCX</NeoButton></Link>
        <Link to="/blog"><NeoButton className={`${isActive('/blog')}`} variant="accent">Blog</NeoButton></Link>
        <Link to="/contact"><NeoButton className={`${isActive('/contact')}`} variant="danger">Contact</NeoButton></Link>
      </div>
    </nav>
  );
};

export default Navbar;