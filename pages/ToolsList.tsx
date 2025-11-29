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
    <div className={`min-h-screen p-8 text-black ${getColor()}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-8 uppercase border-b-3 border-black inline-block bg-white px-4 py-2">{getTitle()}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedTools.map(tool => (
            <Link to={tool.path} key={tool.id}>
              <NeoCard title={tool.name} className="h-full bg-white hover:bg-gray-50 transition-colors">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <p className="text-black leading-relaxed">{tool.description}</p>
              </NeoCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsList;