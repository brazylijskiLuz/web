import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

const badge = cva(["rounded-md m-1 flex justify-center border-2 px-5"], {
  variants: {
    intent: {
      primary: ["bg-[#F4F7FF] text-primary border-primary"],
      secondary: ["bg-[#FFF5F9] text-secondary border-secondary"],
      light: ["bg-light bg-opacity-100 text-darkGray border-light py-2"],
    },
    weight: {
      light: ["font-light"],
      normal: ["font-normal"],
      semi: ["font-semibold"],
      bold: ["font-bold"],
    },
    size: {
      xSmall: ["text-xs py-1"],
      small: ["text-sm"],
      medium: ["text-base"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "xSmall",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof badge> {
  onClick?: () => void;
}

export const Badge: React.FC<ButtonProps> = ({
  onClick,
  className,
  intent,
  size,
  weight,
  children,
}) => {
  return (
    <div
      onClick={onClick}
      className={badge({ className, intent, size, weight })}
    >
      {children}
    </div>
  );
};
