'use client';

import { useState } from 'react';
import Link from 'next/link';
import NeoButton from '@/components/NeoButton';
import NeoCard from '@/components/NeoCard';
import { TOOLS } from '@/lib/constants';

const ToolShowcase = () => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'image' | 'docx' | 'misc'>('pdf');
  
  const filteredTools = TOOLS.filter(t => t.category === activeTab);

  return (
    <section className="max-w-6xl mx-auto p-4 md:p-8 my-12">
      <h2 className="text-3xl md:text-4xl font-black uppercase mb-8 border-l-8 border-[#a388ee] pl-4">
        The Arsenal
      </h2>
      
      <div className="flex flex-wrap gap-3 mb-8">
        <button 
          onClick={() => setActiveTab('pdf')}
          className={`px-5 py-2.5 font-bold border-2 border-black transition-all ${activeTab === 'pdf' ? 'bg-[#ffadad] neo-shadow' : 'bg-white hover:bg-gray-100'}`}
        >
          PDF TOOLS
        </button>
        <button 
          onClick={() => setActiveTab('image')}
          className={`px-5 py-2.5 font-bold border-2 border-black transition-all ${activeTab === 'image' ? 'bg-[#caffbf] neo-shadow' : 'bg-white hover:bg-gray-100'}`}
        >
          IMAGE LAB
        </button>
        <button 
          onClick={() => setActiveTab('docx')}
          className={`px-5 py-2.5 font-bold border-2 border-black transition-all ${activeTab === 'docx' ? 'bg-[#ffc6ff] neo-shadow' : 'bg-white hover:bg-gray-100'}`}
        >
          DOCX STUDIO
        </button>
        <button 
          onClick={() => setActiveTab('misc')}
          className={`px-5 py-2.5 font-bold border-2 border-black transition-all ${activeTab === 'misc' ? 'bg-[#bdb2ff] neo-shadow' : 'bg-white hover:bg-gray-100'}`}
        >
          MISC UTILS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fadeIn">
        {filteredTools.map((tool) => (
          <Link href={tool.path} key={tool.id} className="block group">
            <div className={`h-full border-2 border-black p-5 bg-white transition-all group-hover:neo-shadow group-hover:-translate-y-1 relative overflow-hidden`}>
              <div className={`absolute top-0 right-0 p-1 px-2 border-l-2 border-b-2 border-black font-mono text-xs font-bold uppercase
                ${tool.category === 'pdf' ? 'bg-[#ffadad]' : tool.category === 'image' ? 'bg-[#caffbf]' : tool.category === 'docx' ? 'bg-[#ffc6ff]' : 'bg-[#bdb2ff]'}`}>
                {tool.category}
              </div>
              <div className="text-3xl mb-3">{tool.icon}</div>
              <h3 className="text-lg font-black uppercase mb-2">{tool.name}</h3>
              <p className="text-sm text-gray-800 leading-snug">{tool.description}</p>
              <div className="mt-4 font-bold text-sm underline decoration-2 decoration-[#ff6b6b] group-hover:decoration-black">
                LAUNCH TOOL →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const StatsSection = () => (
  <section className="bg-[#ff6b6b] border-y-3 border-black py-16 px-4 text-black">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-2xl font-black uppercase mb-12 bg-white border-3 border-black inline-block p-4 neo-shadow transform -rotate-2">
        We Crunch The Numbers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border-3 border-black p-8 neo-shadow">
          <div className="text-5xl font-black mb-2">1+</div>
          <div className="font-mono text-lg uppercase">Files Processed</div>
        </div>
        <div className="bg-white border-3 border-black p-8 neo-shadow">
          <div className="text-5xl font-black mb-2">0.5s</div>
          <div className="font-mono text-lg uppercase">Avg. Latency</div>
        </div>
        <div className="bg-white border-3 border-black p-8 neo-shadow">
          <div className="text-5xl font-black mb-2">100%</div>
          <div className="font-mono text-lg uppercase">Open Source</div>
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section className="max-w-4xl mx-auto p-8 my-12">
    <h2 className="text-3xl font-black uppercase mb-8 text-center">Freq. Asked Qs</h2>
    <div className="space-y-4">
      <details className="bg-white border-3 border-black p-5 neo-shadow open:bg-[#fdffb6] transition-colors cursor-pointer">
        <summary className="text-lg font-bold uppercase list-none flex justify-between items-center">
          <span>Is this actually free?</span>
          <span className="text-2xl">+</span>
        </summary>
        <p className="mt-4 border-t-2 border-black pt-4">
          Yes. Easy Tools Town is currently in beta. We run on sheer willpower and highly optimized API calls.
        </p>
      </details>
      <details className="bg-white border-3 border-black p-5 neo-shadow open:bg-[#fdffb6] transition-colors cursor-pointer">
        <summary className="text-lg font-bold uppercase list-none flex justify-between items-center">
          <span>Is it Open Source?</span>
          <span className="text-2xl">+</span>
        </summary>
        <p className="mt-4 border-t-2 border-black pt-4">
          Absolutely. You can find the code on GitHub. Fork it, break it, fix it.
        </p>
      </details>
      <details className="bg-white border-3 border-black p-5 neo-shadow open:bg-[#fdffb6] transition-colors cursor-pointer">
        <summary className="text-lg font-bold uppercase list-none flex justify-between items-center">
          <span>Why does it look like this?</span>
          <span className="text-2xl">+</span>
        </summary>
        <p className="mt-4 border-t-2 border-black pt-4">
          Because we are tired of rounded corners and soft drop shadows. This is the web, raw and uncut.
        </p>
      </details>
    </div>
  </section>
);

export default function HomePage() {
  return (
    <div className="space-y-0 pb-12 text-black">
      {/* Hero */}
      <section className="min-h-[65vh] flex flex-col justify-center items-center text-center p-8 bg-[#ff9f1c] border-b-3 border-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="relative z-10 max-w-5xl">
          <div className="flex justify-center gap-4 mb-6">
            <div className="inline-block bg-[#ff6b6b] border-3 border-black px-4 py-2 font-mono font-bold neo-shadow-sm rotate-3">
               v0.1 LIVE
            </div>
            <div className="inline-block bg-[#9bf6ff] border-3 border-black px-4 py-2 font-mono font-bold neo-shadow-sm -rotate-2">
               OPEN SOURCE
            </div>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 uppercase leading-none bg-white p-6 border-3 border-black md:rotate-[-2deg] neo-shadow">
            BUILD.<br/>CREATE.<br/>SHIP.
          </h1>
          <p className="text-lg md:text-xl font-bold bg-white border-3 border-black p-4 max-w-2xl mx-auto md:rotate-[1deg] neo-shadow">
            A raw collection of utilities for the modern creator. <br/>
            <span className="bg-yellow-300 px-1">No login.</span> <span className="bg-green-300 px-1">No ads.</span> <span className="bg-blue-300 px-1">Just tools.</span>
          </p>
          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/tools"><NeoButton variant="secondary" className="text-lg px-8 py-4 w-full md:w-auto">Start Building</NeoButton></Link>
            <a href="#featured"><NeoButton variant="primary" className="text-lg px-8 py-4 w-full md:w-auto">Explore Features</NeoButton></a>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-black text-white py-4 border-y-3 border-black overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-marquee">
          <span className="text-xl font-mono font-bold mx-4">
            PDF TOOLS /// IMAGE GENERATION /// DOCX STUDIO /// TEXT ANALYSIS /// IDEATION /// EASY TOOLS TOWN /// RAW POWER /// 
          </span>
          <span className="text-xl font-mono font-bold mx-4">
            PDF TOOLS /// IMAGE GENERATION /// DOCX STUDIO /// TEXT ANALYSIS /// IDEATION /// EASY TOOLS TOWN /// RAW POWER /// 
          </span>
        </div>
      </section>

      {/* Tool Showcase */}
      <div id="featured">
        <ToolShowcase />
      </div>

      {/* Stats Section */}
      <StatsSection />

      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 my-12">
        <Link href="/tools/pdf" className="group">
          <NeoCard title="PDF Tools" color="bg-[#ffadad]" className="h-full transition-transform group-hover:-translate-y-2">
            <p className="font-bold mb-4 text-black">Structure and polish your documents.</p>
            <div className="flex justify-between items-end">
              <span className="text-3xl">📄</span>
              <span className="text-sm font-mono border-2 border-black px-2 bg-white">3 TOOLS</span>
            </div>
          </NeoCard>
        </Link>
        <Link href="/tools/image" className="group">
          <NeoCard title="Image Tools" color="bg-[#caffbf]" className="h-full transition-transform group-hover:-translate-y-2">
            <p className="font-bold mb-4 text-black">Generate and analyze visuals.</p>
            <div className="flex justify-between items-end">
              <span className="text-3xl">🖼️</span>
              <span className="text-sm font-mono border-2 border-black px-2 bg-white">3 TOOLS</span>
            </div>
          </NeoCard>
        </Link>
        <Link href="/tools/docx" className="group">
          <NeoCard title="Docx Studio" color="bg-[#ffc6ff]" className="h-full transition-transform group-hover:-translate-y-2">
            <p className="font-bold mb-4 text-black">Edit and expand Word docs.</p>
            <div className="flex justify-between items-end">
              <span className="text-3xl">📝</span>
              <span className="text-sm font-mono border-2 border-black px-2 bg-white">2 TOOLS</span>
            </div>
          </NeoCard>
        </Link>
        <Link href="/tools/misc" className="group">
          <NeoCard title="Misc Tools" color="bg-[#bdb2ff]" className="h-full transition-transform group-hover:-translate-y-2">
            <p className="font-bold mb-4 text-black">Everything else you need.</p>
            <div className="flex justify-between items-end">
              <span className="text-3xl">🔮</span>
              <span className="text-sm font-mono border-2 border-black px-2 bg-white">2 TOOLS</span>
            </div>
          </NeoCard>
        </Link>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Call to Action */}
      <section className="bg-black text-white py-20 px-8 text-center border-t-3 border-black">
         <h2 className="text-4xl md:text-6xl font-black uppercase mb-8">Ready to Build?</h2>
         <Link href="/tools">
           <button className="bg-[#ff6b6b] text-white text-xl font-bold px-10 py-5 border-3 border-white hover:bg-white hover:text-black hover:border-[#ff6b6b] transition-all neo-shadow">
             GET STARTED NOW
           </button>
         </Link>
      </section>
    </div>
  );
}

