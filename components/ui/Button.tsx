import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "gold";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 transform hover:-translate-y-0.5";

  const variants = {
    primary:
      "bg-softBlack-900 text-beige-50 hover:bg-softBlack-700 shadow-lg hover:shadow-xl",
    secondary:
      "border-2 border-softBlack-900 text-softBlack-900 hover:bg-softBlack-900 hover:text-beige-50",
    gold: "bg-gold-500 text-softBlack-900 hover:bg-gold-600 shadow-lg hover:shadow-xl",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

