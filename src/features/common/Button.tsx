import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';

const button = cva(['rounded-md', 'm-1'], {
  variants: {
    intent: {
      primary: ['bg-primary', 'text-white'],
      secondary: ['bg-secondary', 'text-white'],
      light: ['bg-light', 'text-black'],
    },
    glow: {
      none: [''],
      soft: ['shadow-sm'],
      hard: ['shadow-md'],
    },
    weight: {
      light: ['font-light'],
      normal: ['font-normal'],
      semi: ['font-semibold'],
      bold: ['font-bold'],
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-4'],
    },
  },
  compoundVariants: [
    {
      intent: 'primary',
      glow: ['soft', 'hard'],
      class: 'shadow-primary',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
    glow: 'none',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof button> {
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  intent,
  size,
  weight,
  glow,
  children,
}) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={button({ className, intent, size, weight, glow })}>
      {children}
    </motion.button>
  );
};
