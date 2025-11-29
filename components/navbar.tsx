'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NeoButton from './NeoButton';

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path ? 'bg-black text-white' : '';

  return (
    <nav className="sticky top-0 z-50 bg-[#fdf6e3] text-black border-b-3 border-black p-4 flex flex-wrap justify-between items-center gap-4">
      <Link href="/" className="text-2xl font-black uppercase tracking-tight hover:text-[#ff6b6b] transition-colors">
        EASY TOOLS TOWN 🛠️
      </Link>
      <div className="flex gap-2 flex-wrap">
        <Link href="/tools"><NeoButton className={`${isActive('/tools')}`} variant="secondary">All Tools</NeoButton></Link>
        <Link href="/tools/docx"><NeoButton className={`${isActive('/tools/docx')}`} variant="primary">DOCX</NeoButton></Link>
        <Link href="/blog"><NeoButton className={`${isActive('/blog')}`} variant="accent">Blog</NeoButton></Link>
        <Link href="/contact"><NeoButton className={`${isActive('/contact')}`} variant="danger">Contact</NeoButton></Link>
      </div>
    </nav>
  );
};

export default Navbar;
