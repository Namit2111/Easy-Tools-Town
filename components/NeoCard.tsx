import React from 'react';

interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  color?: string;
}

const NeoCard: React.FC<NeoCardProps> = ({ children, className = '', title, color = "bg-white" }) => {
  return (
    <div className={`border-4 border-black p-6 neo-shadow ${color} ${className}`}>
      {title && (
        <div className="border-b-4 border-black pb-2 mb-4">
          <h3 className="text-2xl font-black uppercase tracking-tighter">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};

export default NeoCard;
