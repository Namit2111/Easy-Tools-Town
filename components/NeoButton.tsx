import React from 'react';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
}

const NeoButton: React.FC<NeoButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-4 py-2 text-sm font-bold border-2 border-black transition-all neo-shadow neo-shadow-hover active:neo-shadow-active";
  
  let bgStyle = "bg-white";
  switch (variant) {
    case 'primary': bgStyle = "bg-[#a388ee] text-white"; break; // Purple
    case 'secondary': bgStyle = "bg-[#9bf6ff] text-black"; break; // Cyan
    case 'accent': bgStyle = "bg-[#fdffb6] text-black"; break; // Yellow
    case 'danger': bgStyle = "bg-[#ff6b6b] text-white"; break; // Red
  }

  return (
    <button 
      className={`${baseStyle} ${bgStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeoButton;
