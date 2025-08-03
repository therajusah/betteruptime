import React from 'react';
import CountUp from 'react-countup';

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: 'green' | 'blue' | 'yellow';
}

const colors = {
  green: 'text-green-400',
  blue: 'text-blue-400',
  yellow: 'text-yellow-400',
};

export function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg min-w-[160px]">
      <div className={`mb-3 ${colors[color]} text-4xl`}>{icon}</div>
      <p className="text-white font-semibold text-2xl">
        {typeof value === 'number' ? (
          <CountUp end={value} duration={2.5} separator="," />
        ) : (
          value
        )}
      </p>
      <p className="text-gray-300 text-sm mt-1">{label}</p>
    </div>
  );
} 