import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

const badge = cva(["rounded-md m-1 flex justify-center border-2 px-5"], {
  variants: {
    intent: {
      primary: ["bg-primary bg-opacity-5 text-primary border-primary"],
      secondary: ["bg-secondary bg-opacity-5 text-secondary border-secondary"],
      light: ["bg-light text-darkGray border-light py-2"],
    },
    weight: {
      light: ["font-light"],
      normal: ["font-normal"],
      semi: ["font-semibold"],
      bold: ["font-bold"],
    },
    size: {
      small: ["text-sm"],
      medium: ["text-base"],
    },
  },
  compoundVariants: [
    {
      intent: "primary",
    },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
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
