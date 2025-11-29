'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TOOLS } from '@/lib/constants';

const CATEGORIES = [
  { id: 'all', label: 'All', color: 'bg-white' },
  { id: 'pdf', label: 'PDF', color: 'bg-[#ffadad]' },
  { id: 'image', label: 'Image', color: 'bg-[#caffbf]' },
  { id: 'docx', label: 'DOCX', color: 'bg-[#ffc6ff]' },
  { id: 'misc', label: 'Misc', color: 'bg-[#bdb2ff]' },
];

export default function ToolsListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = useMemo(() => {
    let tools = TOOLS;
    
    if (activeCategory !== 'all') {
      tools = tools.filter(t => t.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tools = tools.filter(t => 
        t.name.toLowerCase().includes(query) || 
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    }
    
    return tools;
  }, [activeCategory, searchQuery]);

  const getBgColor = () => {
    const cat = CATEGORIES.find(c => c.id === activeCategory);
    return cat?.color || 'bg-white';
  };

  return (
    <div className={`min-h-screen p-8 text-black ${getBgColor()}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-6 uppercase border-b-3 border-black inline-block bg-white px-4 py-2">All Tools</h1>
        
        <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 border-3 border-black font-bold text-lg bg-white focus:outline-none neo-shadow"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold hover:text-red-500"
              >
                ✕
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 font-bold border-2 border-black transition-all uppercase
                  ${activeCategory === cat.id 
                    ? `${cat.color} neo-shadow` 
                    : 'bg-white hover:bg-gray-100'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-4 font-mono text-sm">
          Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
          {searchQuery && ` for "${searchQuery}"`}
        </p>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map(tool => (
              <Link href={tool.path} key={tool.id} className="group">
                <div className="relative h-full bg-white border-2 border-black p-5 neo-shadow hover:bg-gray-50 transition-all group-hover:-translate-y-1">
                  <div className={`absolute top-0 right-0 px-2 py-1 border-l-2 border-b-2 border-black text-xs font-bold uppercase
                    ${tool.category === 'pdf' ? 'bg-[#ffadad]' : tool.category === 'image' ? 'bg-[#caffbf]' : tool.category === 'docx' ? 'bg-[#ffc6ff]' : 'bg-[#bdb2ff]'}`}>
                    {tool.category}
                  </div>
                  <h3 className="text-lg font-black uppercase mb-3 border-b-2 border-black pb-2">{tool.name}</h3>
                  <div className="text-3xl mb-3">{tool.icon}</div>
                  <p className="text-sm text-black leading-relaxed">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border-3 border-black p-12 text-center neo-shadow">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-black uppercase mb-2">No Tools Found</h3>
            <p className="text-gray-600">Try a different search term or category</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-6 px-6 py-3 bg-black text-white font-bold border-2 border-black hover:bg-white hover:text-black transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

