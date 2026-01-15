import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';
  
  const variants = {
    primary: 'bg-[var(--primary-purple)] text-white hover:bg-[var(--primary-purple-dark)] focus:ring-[var(--primary-purple)]',
    secondary: 'bg-[var(--accent-purple)] text-[var(--foreground)] hover:bg-[var(--primary-purple-light)] focus:ring-[var(--primary-purple)]',
    outline: 'border-2 border-[var(--primary-purple)] text-[var(--primary-purple)] hover:bg-[var(--primary-purple)] hover:text-white focus:ring-[var(--primary-purple)]',
    gold: 'bg-[var(--primary-gold)] text-white hover:bg-[var(--primary-gold-dark)] focus:ring-[var(--primary-gold)]',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
