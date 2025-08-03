import React from 'react';

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-default select-none">
      <div className="mb-5">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 font-light leading-relaxed">{description}</p>
    </div>
  );
} 