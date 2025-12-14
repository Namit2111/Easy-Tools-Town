'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NeoCard from './NeoCard';
import { TOOLS } from '@/lib/constants';

interface ToolLayoutProps {
  toolId?: string;
  title?: string;
  color?: string;
  children: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ toolId, title, color, children }) => {
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);
  const [relatedTools, setRelatedTools] = useState<typeof TOOLS>([]);
  const toolData = TOOLS.find(t => t.id === toolId);

  const displayTitle = toolData ? toolData.name : title || 'Tool';
  const displayColor = toolData ?
    (toolData.category === 'pdf' ? 'bg-[#ffadad]' : toolData.category === 'image' ? 'bg-[#caffbf]' : toolData.category === 'docx' ? 'bg-[#ffc6ff]' : toolData.category === 'video' ? 'bg-[#a8e6cf]' : 'bg-[#bdb2ff]')
    : color || 'bg-white';

  // Randomize related tools on client side only to avoid hydration mismatch
  useEffect(() => {
    const shuffled = TOOLS.filter(t => t.id !== toolId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setRelatedTools(shuffled);
  }, [toolId]);

  return (
    <div className={`min-h-screen p-4 md:p-8 text-black ${displayColor}`}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Back Link */}
        <Link href="/tools" className="inline-block font-bold border-b-2 border-black hover:text-white transition-colors px-1">← BACK TO TOOLS</Link>

        {/* Main Tool Area - Full Width */}
        <NeoCard title={displayTitle} className="bg-white min-h-[400px]">
          {children}
        </NeoCard>

        {/* Info Boxes - Below Tool */}
        {toolData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* How to Use - Collapsible */}
            <div className="bg-white border-2 border-black neo-shadow">
              <button
                onClick={() => setIsHowToUseOpen(!isHowToUseOpen)}
                className="w-full flex items-center justify-between p-4 font-black uppercase text-left hover:bg-gray-50 transition-colors"
              >
                <span>How to Use</span>
                <span className="text-xl">{isHowToUseOpen ? '−' : '+'}</span>
              </button>
              {isHowToUseOpen && (
                <div className="px-4 pb-4 border-t-2 border-black">
                  <div className="prose font-mono text-sm whitespace-pre-line leading-relaxed pt-4">
                    {toolData.instructions}
                  </div>
                </div>
              )}
            </div>

            {/* Pro Tip */}
            <div className="bg-black text-white p-4 border-2 border-black neo-shadow flex flex-col justify-center">
              <h4 className="font-bold uppercase mb-2">🔒 Pro Tip</h4>
              <p className="text-sm opacity-90">This tool runs entirely in your browser. Your files never leave your device.</p>
            </div>
          </div>
        )}

        {/* Related Tools Section */}
        <div className="mt-6">
          <h3 className="text-lg font-black uppercase mb-4 border-b-2 border-black inline-block">Discover More</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map(tool => (
              <Link key={tool.id} href={tool.path} className="group">
                <div className="bg-white border-2 border-black p-4 h-full hover:bg-black hover:text-white transition-all">
                  <div className="text-2xl mb-2">{tool.icon}</div>
                  <div className="font-bold uppercase text-sm">{tool.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ToolLayout;
