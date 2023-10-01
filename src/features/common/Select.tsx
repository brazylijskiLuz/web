import React, { useEffect, useRef, useState } from "react";
import ErrorComponent from "@/features/common/ErrorComponent";
import { useOutsideClick } from "@/utils/hooks/useOutsideClick";
import { cva, type VariantProps } from "class-variance-authority";
import { TriangleSvg } from "@/assets/svgs/Triangle.svg";

const select = cva(
  [
    "rounded-md min-w-[5rem] flex items-center py-2 px-3 relative outline-none w-full text-darkGray placeholder:text-gray font-light cursor-pointer",
  ],
  {
    variants: {
      intent: {
        gray: ["bg-gray"],
        white: ["bg-white"],
        light: ["bg-light"],
      },
      border: {
        primary: ["border-2", "border-primary"],
        secondary: ["border-2", "border-secondary"],
        gray: ["border-2", "border-gray"],
        darkGray: ["border-2", "border-darkGray"],
        success: ["border-2", "border-success"],
        danger: ["border-2", "border-danger"],
      },
      outline: {
        none: ["focus:border-0"],
        primary: ["focus:border-2", "focus:border-primary"],
        secondary: ["focus:border-2", "focus:border-secondary"],
      },
    },
    defaultVariants: { intent: "light", outline: "primary" },
  },
);
export interface ISelectProps
  extends Omit<
      React.InputHTMLAttributes<HTMLDivElement>,
      "value" | "defaultValue" | "onSelect"
    >,
    VariantProps<typeof select> {
  options: string[];
  onSelect: (val: string) => void;
  defaultValue: string;
  value?: string;
  error?: string;
}

export const Select = ({
  intent,
  border,
  outline,
  className,
  options,
  onSelect,
  defaultValue,
  value,
  error,
  ...props
}: ISelectProps) => {
  const selectRef = useRef<HTMLDivElement | null>(null);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedOption(value || defaultValue);
    onSelect(value || defaultValue);
    if (typeof value === "undefined") return;
    setIsOpen(false);
  }, [value, defaultValue]);

  useOutsideClick(selectRef, () => setIsOpen(false));

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={selectRef}
      className={select({ className, intent, border, outline })}
      onClick={(e) => {
        setIsOpen((prev) => !prev);
        props.onClick && props.onClick(e);
      }}
      {...props}
    >
      <p>{selectedOption || defaultValue}</p>
      <div
        className={`${
          isOpen ? "rotate-180" : "rotate-0"
        } absolute right-3 transition-all`}
      >
        <TriangleSvg />
      </div>
      {isOpen && (
        <ul className="absolute left-0 top-11 z-30 w-full rounded-md border border-neutral-200 bg-gray shadow-md">
          {options.map((option) => (
            <li
              key={option}
              className={`cursor-pointer px-4 py-2 transition-all first:rounded-t-md last:rounded-b-md hover:bg-neutral-200 ${
                option === selectedOption ? "bg-slate-200" : "bg-neutral-100"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {error && <ErrorComponent msg={error} />}
    </div>
  );
};
