import React from 'react';

interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  color?: string;
}

const NeoCard: React.FC<NeoCardProps> = ({ children, className = '', title, color = "bg-white" }) => {
  return (
    <div className={`border-2 border-black p-5 neo-shadow ${color} ${className}`}>
      {title && (
        <div className="border-b-2 border-black pb-2 mb-4">
          <h3 className="text-xl font-black uppercase tracking-tight">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};

export default NeoCard;
