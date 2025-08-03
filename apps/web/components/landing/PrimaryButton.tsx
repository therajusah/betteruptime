import React, { ReactNode, ButtonHTMLAttributes } from 'react';

export interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export function PrimaryButton({ children, className = '', ...props }: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 transition-all duration-300 text-white py-3 px-8 rounded-lg shadow-md font-semibold text-lg select-none focus:outline-none focus:ring-2 focus:ring-green-400 ${className}`}
    >
      {children}
    </button>
  );
} 