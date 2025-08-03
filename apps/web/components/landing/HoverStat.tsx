import React from 'react';
import CountUp from 'react-countup';

export interface HoverStatProps {
  number: string | number;
  label: string;
}

export function HoverStat({ number, label }: HoverStatProps) {
  return (
    <div className="group cursor-default select-none">
      <div className="text-5xl font-extralight text-white mb-2 group-hover:scale-110 transition-transform duration-300">
        {typeof number === 'number' ? (
          <CountUp end={number} duration={2} />
        ) : (
          number
        )}
      </div>
      <div className="text-gray-400 font-light">{label}</div>
    </div>
  );
} 