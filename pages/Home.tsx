import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NeoButton from '../components/NeoButton';
import NeoCard from '../components/NeoCard';
import { TOOLS } from '../data/constants';

const ToolShowcase = () => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'image' | 'docx' | 'misc'>('pdf');
  
  const filteredTools = TOOLS.filter(t => t.category === activeTab);

  return (
    <section className="max-w-5xl mx-auto p-4 md:p-6 my-8">
      <h2 className="text-xl md:text-2xl font-black uppercase mb-5 border-l-4 border-[#a388ee] pl-3">
        The Arsenal
      </h2>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button 
          onClick={() => setActiveTab('pdf')}
          className={`px-3 py-1.5 font-bold text-xs border-2 border-black transition-all ${activeTab === 'pdf' ? 'bg-[#ffadad] neo-shadow' : 'bg-white hover:bg-gray-100'}`}
        >
          PDF TOOLS
        </button>
        <button 
          onClick={() => setActiveTab('image')}
          className={`px-3 py-1.5 font-bold text-xs border-2 border-black transition-all ${activeTab === 'image' ? 'bg-[#caffbf] neo-shadow' : 'bg-white hover:bg-gray-100'}`}
        >
          IMAGE LAB
        </button>
        <button 
          onClick={() => setActiveTab('docx')}
          className={`px-3 py-1.5 font-bold text-xs border-2 border-black transition-all ${activeTab === 'docx' ? 'bg-[#ffc6ff] neo-shadow' : 'bg-white hover:bg-gray-100'}`}
        >
          DOCX STUDIO
        </button>
        <button 
          onClick={() => setActiveTab('misc')}
          className={`px-3 py-1.5 font-bold text-xs border-2 border-black transition-all ${activeTab === 'misc' ? 'bg-[#bdb2ff] neo-shadow' : 'bg-white hover:bg-gray-100'}`}
        >
          MISC UTILS
        </button>
      </div>

      {/* Content Area - Smaller Cards, 3 per row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-fadeIn">
        {filteredTools.map((tool) => (
          <Link to={tool.path} key={tool.id} className="block group">
            <div className={`h-full border-2 border-black p-3 bg-white transition-all group-hover:neo-shadow group-hover:-translate-y-1 relative overflow-hidden`}>
              <div className={`absolute top-0 right-0 p-0.5 px-1.5 border-l-2 border-b-2 border-black font-mono text-[8px] font-bold uppercase
                ${tool.category === 'pdf' ? 'bg-[#ffadad]' : tool.category === 'image' ? 'bg-[#caffbf]' : tool.category === 'docx' ? 'bg-[#ffc6ff]' : 'bg-[#bdb2ff]'}`}>
                {tool.category}
              </div>
              <div className="text-xl mb-2">{tool.icon}</div>
              <h3 className="text-sm font-black uppercase mb-1">{tool.name}</h3>
              <p className="text-xs font-medium text-gray-800 leading-tight">{tool.description}</p>
              <div className="mt-2 font-bold text-[10px] underline decoration-2 decoration-[#ff6b6b] group-hover:decoration-black">
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
  <section className="bg-[#ff6b6b] border-y-2 border-black py-10 px-4 text-black">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-lg font-black uppercase text-center mb-8 bg-white border-2 border-black inline-block p-2.5 neo-shadow transform -rotate-2">
        We Crunch The Numbers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-white border-2 border-black p-5 neo-shadow">
          <div className="text-3xl font-black mb-1">1M+</div>
          <div className="font-mono text-xs uppercase">Files Processed</div>
        </div>
        <div className="bg-white border-2 border-black p-5 neo-shadow transform translate-y-2 md:translate-y-0">
          <div className="text-3xl font-black mb-1">0.5s</div>
          <div className="font-mono text-xs uppercase">Avg. Latency</div>
        </div>
        <div className="bg-white border-2 border-black p-5 neo-shadow">
          <div className="text-3xl font-black mb-1">100%</div>
          <div className="font-mono text-xs uppercase">Open Source</div>
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section className="max-w-3xl mx-auto p-6 my-8">
    <h2 className="text-xl font-black uppercase mb-5 text-center">Freq. Asked Qs</h2>
    <div className="space-y-3">
      <details className="bg-white border-2 border-black p-4 neo-shadow open:bg-[#fdffb6] transition-colors cursor-pointer">
        <summary className="text-sm font-bold uppercase list-none flex justify-between items-center">
          <span>Is this actually free?</span>
          <span className="text-xl">+</span>
        </summary>
        <p className="mt-3 text-xs border-t border-black pt-3">
          Yes. Easy Tools Town is currently in beta. We run on sheer willpower and highly optimized API calls.
        </p>
      </details>
      <details className="bg-white border-2 border-black p-4 neo-shadow open:bg-[#fdffb6] transition-colors cursor-pointer">
        <summary className="text-sm font-bold uppercase list-none flex justify-between items-center">
          <span>Is it Open Source?</span>
          <span className="text-xl">+</span>
        </summary>
        <p className="mt-3 text-xs border-t border-black pt-3">
          Absolutely. You can find the code on GitHub. Fork it, break it, fix it.
        </p>
      </details>
      <details className="bg-white border-2 border-black p-4 neo-shadow open:bg-[#fdffb6] transition-colors cursor-pointer">
        <summary className="text-sm font-bold uppercase list-none flex justify-between items-center">
          <span>Why does it look like this?</span>
          <span className="text-xl">+</span>
        </summary>
        <p className="mt-3 text-xs border-t border-black pt-3">
          Because we are tired of rounded corners and soft drop shadows. This is the web, raw and uncut.
        </p>
      </details>
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="space-y-0 pb-8 text-black">
      {/* Hero */}
      <section className="min-h-[50vh] flex flex-col justify-center items-center text-center p-6 bg-[#ff9f1c] border-b-2 border-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
        
        <div className="relative z-10 max-w-4xl">
          <div className="flex justify-center gap-2 mb-4">
            <div className="inline-block bg-[#ff6b6b] border-2 border-black px-2 py-1 font-mono font-bold text-xs neo-shadow-sm rotate-3">
               v2.0 LIVE
            </div>
            <div className="inline-block bg-[#9bf6ff] border-2 border-black px-2 py-1 font-mono font-bold text-xs neo-shadow-sm -rotate-2">
               OPEN SOURCE
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 uppercase leading-none bg-white p-4 border-2 border-black md:rotate-[-2deg] neo-shadow">
            BUILD.<br/>CREATE.<br/>SHIP.
          </h1>
          <p className="text-sm md:text-base font-bold bg-white border-2 border-black p-3 max-w-xl mx-auto md:rotate-[1deg] neo-shadow">
            A raw collection of utilities for the modern creator. <br/>
            <span className="bg-yellow-300 px-0.5">No login.</span> <span className="bg-green-300 px-0.5">No ads.</span> <span className="bg-blue-300 px-0.5">Just tools.</span>
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-3 justify-center">
            <Link to="/tools"><NeoButton variant="secondary" className="text-sm px-6 py-2.5 w-full md:w-auto">Start Building</NeoButton></Link>
            <a href="#featured"><NeoButton variant="primary" className="text-sm px-6 py-2.5 w-full md:w-auto">Explore Features</NeoButton></a>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-black text-white py-3 border-y-2 border-black overflow-hidden whitespace-nowrap">
        <div className="inline-block text-sm font-mono font-bold animate-[marquee_20s_linear_infinite]">
           PDF TOOLS /// IMAGE GENERATION /// DOCX STUDIO /// TEXT ANALYSIS /// IDEATION /// PDF TOOLS /// IMAGE GENERATION /// TEXT ANALYSIS /// IDEATION /// EASY TOOLS TOWN /// RAW POWER /// 
        </div>
      </section>

      {/* Tool Showcase (Cycler) */}
      <div id="featured">
        <ToolShowcase />
      </div>

      {/* Stats Section */}
      <StatsSection />

      {/* Categories Grid (Legacy/Quick Access) */}
      <section className="max-w-5xl mx-auto p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-3 my-8">
        <Link to="/tools/pdf" className="group">
          <NeoCard title="PDF Tools" color="bg-[#ffadad]" className="h-full transition-transform group-hover:-translate-y-1">
            <p className="font-bold text-xs mb-2 text-black">Structure and polish your documents.</p>
            <div className="flex justify-between items-end">
              <span className="text-xl">📄</span>
              <span className="text-[10px] font-mono border border-black px-1 bg-white">3 TOOLS</span>
            </div>
          </NeoCard>
        </Link>
        <Link to="/tools/image" className="group">
          <NeoCard title="Image Tools" color="bg-[#caffbf]" className="h-full transition-transform group-hover:-translate-y-1">
            <p className="font-bold text-xs mb-2 text-black">Generate and analyze visuals.</p>
            <div className="flex justify-between items-end">
              <span className="text-xl">🖼️</span>
              <span className="text-[10px] font-mono border border-black px-1 bg-white">3 TOOLS</span>
            </div>
          </NeoCard>
        </Link>
        <Link to="/tools/docx" className="group">
          <NeoCard title="Docx Studio" color="bg-[#ffc6ff]" className="h-full transition-transform group-hover:-translate-y-1">
            <p className="font-bold text-xs mb-2 text-black">Edit and expand Word docs.</p>
            <div className="flex justify-between items-end">
              <span className="text-xl">📝</span>
              <span className="text-[10px] font-mono border border-black px-1 bg-white">2 TOOLS</span>
            </div>
          </NeoCard>
        </Link>
        <Link to="/tools/misc" className="group">
          <NeoCard title="Misc Tools" color="bg-[#bdb2ff]" className="h-full transition-transform group-hover:-translate-y-1">
            <p className="font-bold text-xs mb-2 text-black">Everything else you need.</p>
            <div className="flex justify-between items-end">
              <span className="text-xl">🔮</span>
              <span className="text-[10px] font-mono border border-black px-1 bg-white">2 TOOLS</span>
            </div>
          </NeoCard>
        </Link>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Call to Action */}
      <section className="bg-black text-white py-12 px-6 text-center border-t-2 border-black">
         <h2 className="text-2xl md:text-3xl font-black uppercase mb-5">Ready to Build?</h2>
         <Link to="/tools">
           <button className="bg-[#ff6b6b] text-white text-sm font-bold px-6 py-3 border-2 border-white hover:bg-white hover:text-black hover:border-[#ff6b6b] transition-all neo-shadow">
             GET STARTED NOW
           </button>
         </Link>
      </section>
    </div>
  );
};

export default Home;