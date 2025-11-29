import React from 'react';
import NeoCard from '../components/NeoCard';

const About = () => (
  <div className="max-w-3xl mx-auto p-6 min-h-screen text-black">
    <NeoCard title="Who We Are" color="bg-white" className="mb-6">
      <p className="text-sm mb-3">
        Easy Tools Town is a reaction against the overly polished, rounded-corner corporate web. 
        We believe tools should be rugged, reliable, and accessible.
      </p>
      <p className="text-sm font-bold">
        We use cutting-edge Gemini AI models to power our utilities, but wrapped in a design 
        that reminds you of the early, wild web.
      </p>
    </NeoCard>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      <div className="bg-[#9bf6ff] border-2 border-black p-4 neo-shadow">
        <h3 className="text-sm font-black uppercase mb-2">Our Mission</h3>
        <p className="text-xs">To provide high-quality AI tools without the corporate fluff. Fast. Brutal. Effective.</p>
      </div>
      <div className="bg-[#fdffb6] border-2 border-black p-4 neo-shadow">
        <h3 className="text-sm font-black uppercase mb-2">Open Source</h3>
        <p className="text-xs">Built with React, Tailwind, and Gemini AI. The code is open for anyone to inspect, learn from, or improve.</p>
      </div>
    </div>
  </div>
);

export default About;