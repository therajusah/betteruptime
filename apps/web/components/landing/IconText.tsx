import React from 'react';

export interface IconTextProps {
  icon: React.ReactNode;
  text: string;
}

export function IconText({ icon, text }: IconTextProps) {
  return (
    <div className="flex items-center gap-3 text-gray-300 font-light select-none">
      {icon}
      <span>{text}</span>
    </div>
  );
} 