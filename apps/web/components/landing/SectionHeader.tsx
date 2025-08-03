import React from 'react';

export interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16 select-none">
      <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wide">{title}</h2>
      <div className="w-20 h-px mx-auto bg-gradient-to-r from-green-400 to-teal-400 rounded-full" />
    </div>
  );
} 
 