import React from 'react';
import { Link } from 'react-router-dom';
import NeoCard from './NeoCard.tsx';
import { Tool } from '../types.ts';
import { TOOLS } from '../data/constants.ts';

interface ToolLayoutProps {
  toolId?: string; // Optional ID to look up metadata
  title?: string; // Fallback if no ID
  color?: string; // Fallback if no ID
  children: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ toolId, title, color, children }) => {
  const toolData = TOOLS.find(t => t.id === toolId);
  
  const displayTitle = toolData ? toolData.name : title || 'Tool';
  const displayColor = toolData ? 
    (toolData.category === 'pdf' ? 'bg-[#ffadad]' : toolData.category === 'image' ? 'bg-[#caffbf]' : 'bg-[#bdb2ff]') 
    : color || 'bg-white';

  // Get random other tools for the "See Also" section
  const relatedTools = TOOLS.filter(t => t.id !== toolId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className={`min-h-screen p-4 md:p-8 text-black ${displayColor}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Tool Area */}
        <div className="lg:col-span-2 space-y-6">
          <Link to="/tools" className="inline-block font-bold border-b-2 border-black hover:text-white transition-colors px-1 mb-2">← BACK TO TOOLS</Link>
          
          <NeoCard title={displayTitle} className="bg-white min-h-[450px]">
            {children}
          </NeoCard>
          
          {/* Related Tools Section */}
          <div className="mt-10">
            <h3 className="text-lg font-black uppercase mb-4 border-b-2 border-black inline-block">Discover More</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTools.map(tool => (
                <Link key={tool.id} to={tool.path} className="group">
                  <div className="bg-white border-2 border-black p-4 h-full hover:bg-black hover:text-white transition-all">
                     <div className="text-2xl mb-2">{tool.icon}</div>
                     <div className="font-bold uppercase text-sm">{tool.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / Instructions */}
        <div className="lg:col-span-1">
           {toolData && (
             <div className="sticky top-24">
               <NeoCard title="How to Use" className="bg-white border-2 border-black">
                 <div className="prose font-mono text-sm whitespace-pre-line leading-relaxed">
                   {toolData.instructions}
                 </div>
               </NeoCard>
               
               <div className="mt-6 bg-black text-white p-4 border-2 border-white neo-shadow">
                 <h4 className="font-bold uppercase mb-2">Pro Tip</h4>
                 <p className="text-sm opacity-90">This tool runs entirely in your browser. Your files never leave your device.</p>
               </div>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default ToolLayout;