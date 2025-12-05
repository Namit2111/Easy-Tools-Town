'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import NeoButton from './NeoButton';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) => pathname === path ? 'bg-black text-white' : '';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#fdf6e3] text-black border-b-3 border-black p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black uppercase tracking-tight hover:text-[#ff6b6b] transition-colors">
          EASY TOOLS TOWN 🛠️
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-2">
          <Link href="/tools"><NeoButton className={`${isActive('/tools')}`} variant="secondary">All Tools</NeoButton></Link>
          <Link href="/tools/docx"><NeoButton className={`${isActive('/tools/docx')}`} variant="primary">DOCX</NeoButton></Link>
          <Link href="/blog"><NeoButton className={`${isActive('/blog')}`} variant="accent">Blog</NeoButton></Link>
          <Link href="/contact"><NeoButton className={`${isActive('/contact')}`} variant="danger">Contact</NeoButton></Link>
        </div>

        {/* Hamburger Button (Mobile Only) */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 p-2 border-3 border-black bg-white hover:bg-[#ff6b6b] transition-colors neo-shadow active:neo-shadow-active"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-black transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-[#fdf6e3] border-l-4 border-black z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col gap-4">
          <button
            onClick={closeMenu}
            className="self-end text-3xl font-black hover:text-[#ff6b6b] transition-colors"
            aria-label="Close menu"
          >
            ✕
          </button>
          <Link href="/tools" onClick={closeMenu}>
            <NeoButton className={`w-full ${isActive('/tools')}`} variant="secondary">All Tools</NeoButton>
          </Link>
          <Link href="/tools/docx" onClick={closeMenu}>
            <NeoButton className={`w-full ${isActive('/tools/docx')}`} variant="primary">DOCX</NeoButton>
          </Link>
          <Link href="/blog" onClick={closeMenu}>
            <NeoButton className={`w-full ${isActive('/blog')}`} variant="accent">Blog</NeoButton>
          </Link>
          <Link href="/contact" onClick={closeMenu}>
            <NeoButton className={`w-full ${isActive('/contact')}`} variant="danger">Contact</NeoButton>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
