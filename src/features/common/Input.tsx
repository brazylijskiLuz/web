import { cva, type VariantProps } from "class-variance-authority";
import React, { forwardRef, useState } from "react";
import ErrorComponent from "@/features/common/ErrorComponent";

const input = cva(["rounded-md", "p-2", "outline-none", "w-full"], {
  variants: {
    intent: {
      light: ["bg-light"],
      white: ["bg-white"],
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
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value">,
    VariantProps<typeof input> {
  handleChange?: (e: string) => void;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
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
      ...props
    },
    ref,
  ) => {
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

    return (
      <div className={"relative"}>
        <input
          type={type === "number" ? "text" : type}
          value={value}
          onChange={handleChangeVal}
          placeholder={placeholder}
          className={input({ intent, border, outline, className })}
          ref={ref}
          {...props}
        />
        {error && <ErrorComponent msg={error} />}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
