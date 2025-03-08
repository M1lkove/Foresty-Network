
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, href, children, ...props }, ref) => {
    
    const baseStyles = cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      
      // Variants
      variant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]',
      variant === 'outline' && 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
      variant === 'link' && 'text-primary underline-offset-4 hover:underline',
      variant === 'destructive' && 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      
      // Sizes
      size === 'default' && 'h-10 px-5 py-2',
      size === 'sm' && 'h-9 rounded-md px-3',
      size === 'lg' && 'h-12 rounded-md px-8',
      size === 'icon' && 'h-10 w-10',
      
      className
    );
    
    if (href) {
      return (
        <Link 
          to={href}
          className={baseStyles}
        >
          {children}
        </Link>
      );
    }
    
    return (
      <button 
        ref={ref} 
        className={baseStyles} 
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
