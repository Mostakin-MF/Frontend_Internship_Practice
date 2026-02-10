import React from "react";
import styles from "../animated-buttons.module.css";

type BaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variantClass?: string; // example: styles['btn-1']
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

export default function BaseButton({
  variantClass = "",
  children,
  className = "",
  size = "md",
  ...rest
}: BaseProps) {
  const sizeClasses =
    size === "sm"
      ? "px-3 py-1 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2 text-base";

  // Tailwind replacement of the original .custom-btn base row CSS:
  // - fixed width/height kept via inline style to match original exactly (130x40),
  // - font-family: set to Lato via a global import (see demo notes),
  // - uses boxShadow via inline style so we preserve inset heavy shadows across projects.
  const baseClasses =
    `inline-block rounded-md font-medium transition-all duration-300 ease-in-out
     focus:outline-none align-middle select-none ${sizeClasses} ${className}`;

  const inlineBoxShadow =
    "inset 2px 2px 2px rgba(255,255,255,.5), 7px 7px 20px rgba(0,0,0,.1), 4px 4px 5px rgba(0,0,0,.1)";

  return (
    <button
      {...rest}
      type={rest.type ?? "button"}
      className={`${baseClasses} ${variantClass}`.trim()}
      style={{ boxShadow: inlineBoxShadow, width: 130, height: 40 }}
    >
      {children}
    </button>
  );
}