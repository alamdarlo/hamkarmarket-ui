// src/components/ui/Button.tsx
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export const Button = ({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        
          variant === 'default' && 'bg-gray-900 text-white hover:bg-gray-800' ,
          variant === 'outline' && 'border border-gray-300 bg-transparent hover:bg-gray-100' ,
          variant === 'ghost' && 'bg-transparent hover:bg-gray-100' ,
          size === 'default' && 'h-10 py-2 px-4' ,
          size === 'sm' && 'h-9 px-3 rounded-md' ,
          size === 'lg' && 'h-11 px-8 rounded-md' ,
        className
      )}
      {...props}
    />
  );
};