import React from 'react';
import { Link } from 'react-router-dom';
import NeoCard from '../components/NeoCard';
import { TOOLS } from '../data/constants';

const ToolsList = ({ category }: { category?: string }) => {
  const displayedTools = category 
    ? TOOLS.filter(t => t.category === category)
    : TOOLS;

  const getTitle = () => {
    if (category === 'pdf') return "PDF Architect Studio";
    if (category === 'image') return "Visual Synthesis Lab";
    if (category === 'docx') return "Docx Word Smith";
    if (category === 'misc') return "The Utility Drawer";
    return "All Tools";
  };

  const getColor = () => {
    if (category === 'pdf') return "bg-[#ffadad]";
    if (category === 'image') return "bg-[#caffbf]";
    if (category === 'docx') return "bg-[#ffc6ff]";
    if (category === 'misc') return "bg-[#bdb2ff]";
    return "bg-white";
  }

  return (
    <div className={`min-h-screen p-6 text-black ${getColor()}`}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-black mb-5 uppercase border-b-2 border-black inline-block bg-white px-3 py-1">{getTitle()}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedTools.map(tool => (
            <Link to={tool.path} key={tool.id}>
              <NeoCard title={tool.name} className="h-full bg-white hover:bg-gray-50 transition-colors">
                <div className="text-2xl mb-2">{tool.icon}</div>
                <p className="text-xs text-black leading-relaxed">{tool.description}</p>
              </NeoCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsList;