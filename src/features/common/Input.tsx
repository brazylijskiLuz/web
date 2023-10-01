import { cva, type VariantProps } from "class-variance-authority";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import ErrorComponent from "@/features/common/ErrorComponent";
import searchSvg from "@/assets/svgs/search.svg";
import Image from "next/image";

const input = cva(
  [
    "rounded-md",
    "py-2",
    "px-3",
    "outline-none",
    "w-full",
    "text-darkGray",
    "placeholder:text-gray placeholder:font-light",
  ],
  {
    variants: {
      intent: {
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

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {
  handleChange?: (e: string) => void;
  placeholder?: string;
  defaultValue?: any;
  error?: string;
  showSearchIcon?: boolean;
  containerStyles?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onChange,
      handleChange,
      placeholder,
      intent,
      border,
      outline,
      className,
      type = "text",
      defaultValue,
      error,
      showSearchIcon,
      containerStyles,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [value, setValue] = useState(defaultValue || "");

    const handleChangeVal = (event: React.ChangeEvent<HTMLInputElement>) => {
      const result =
        type === "number"
          ? event.target.value.replace(/\D/g, "")
          : event.target.value;

      const modifiedEvent = {
        ...event,
        target: {
          ...event.target,
          value: result,
        },
      };

      setValue(result);
      onChange && onChange(event);
    };

    useEffect(() => {
      props.value && setValue(props.value as string);
    }, [props.value]);

    return (
      <div className={`${containerStyles} relative`}>
        <div className={"flex items-center"}>
          <input
            type={type === "number" ? "text" : type}
            value={value}
            onChange={handleChangeVal}
            placeholder={placeholder}
            className={input({ className, intent, border, outline })}
            ref={(el) => {
              inputRef.current = el;
              if (typeof ref === "function") {
                ref(el);
              }
            }}
            {...props}
          />
          {showSearchIcon && (
            <Image
              onClick={() => inputRef?.current?.focus()}
              src={searchSvg}
              alt={"Search"}
              className={"absolute right-3"}
            />
          )}
        </div>
        {error && <ErrorComponent msg={error} />}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
