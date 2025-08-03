import React, { ReactNode, ButtonHTMLAttributes } from 'react';

export interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export function SecondaryButton({ children, className = '', ...props }: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 text-gray-300 border border-gray-600 hover:border-gray-400 hover:bg-gray-800/60 transition-colors duration-300 py-3 px-8 rounded-lg font-medium select-none focus:outline-none focus:ring-2 focus:ring-green-400 ${className}`}
    >
      {children}
    </button>
  );
} 