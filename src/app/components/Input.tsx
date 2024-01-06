import React, { InputHTMLAttributes, forwardRef } from "react";

type InputProps = {
  className?: string;
  error: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`border border-slate-300 p-2 rounded-md outline-none ${className} ${
          error ? "border-red-500" : ""
        }`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input