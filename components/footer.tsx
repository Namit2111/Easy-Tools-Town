import React from 'react';

const Footer = () => (
  <footer className="bg-black text-white p-8 mt-12 border-t-4 border-black">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">EASY TOOLS TOWN</h2>
        <p className="text-gray-400">Rough edges. High utility.</p>
        <div className="mt-2 inline-block border-2 border-white px-2 py-1 text-xs font-mono uppercase text-[#9bf6ff]">
          Open Source Project
        </div>
      </div>
      <div className="flex gap-4">
        <a href="#" className="hover:underline text-[#ff6b6b]">Twitter</a>
        <a href="#" className="hover:underline text-[#9bf6ff]">GitHub</a>
        <a href="#" className="hover:underline text-[#fdffb6]">Discord</a>
      </div>
      <p className="text-sm text-gray-500">© 2024 Easy Tools Town Inc.</p>
    </div>
  </footer>
);

export default Footer;