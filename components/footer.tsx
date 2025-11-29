import React from 'react';

const Footer = () => (
  <footer className="bg-black text-white p-5 mt-8 border-t-2 border-black">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <h2 className="text-base font-bold mb-1">EASY TOOLS TOWN</h2>
        <p className="text-gray-400 text-xs">Rough edges. High utility.</p>
        <div className="mt-1.5 inline-block border border-white px-1.5 py-0.5 text-[10px] font-mono uppercase text-[#9bf6ff]">
          Open Source Project
        </div>
      </div>
      <div className="flex gap-3 text-xs">
        <a href="#" className="hover:underline text-[#ff6b6b]">Twitter</a>
        <a href="#" className="hover:underline text-[#9bf6ff]">GitHub</a>
        <a href="#" className="hover:underline text-[#fdffb6]">Discord</a>
      </div>
      <p className="text-xs text-gray-500">© 2024 Easy Tools Town Inc.</p>
    </div>
  </footer>
);

export default Footer;