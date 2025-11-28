import React from 'react';
import NeoCard from '../components/NeoCard';

const About = () => (
  <div className="max-w-4xl mx-auto p-8 min-h-screen text-black">
    <NeoCard title="Who We Are" color="bg-white" className="mb-8">
      <p className="text-lg mb-4">
        Easy Tools Town is a reaction against the overly polished, rounded-corner corporate web. 
        We believe tools should be rugged, reliable, and accessible.
      </p>
      <p className="text-lg font-bold">
        We use cutting-edge Gemini AI models to power our utilities, but wrapped in a design 
        that reminds you of the early, wild web.
      </p>
    </NeoCard>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      <div className="bg-[#9bf6ff] border-4 border-black p-6 neo-shadow">
        <h3 className="text-2xl font-black uppercase mb-4">Our Mission</h3>
        <p>To provide high-quality AI tools without the corporate fluff. Fast. Brutal. Effective.</p>
      </div>
      <div className="bg-[#fdffb6] border-4 border-black p-6 neo-shadow">
        <h3 className="text-2xl font-black uppercase mb-4">Open Source</h3>
        <p>Built with React, Tailwind, and Gemini AI. The code is open for anyone to inspect, learn from, or improve.</p>
      </div>
    </div>
  </div>
);

export default About;