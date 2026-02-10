import React from "react";
import BaseButton from "../BaseButton";
import styles from "../animated-buttons.module.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

export default function OceanGradientButton({ children = "Read More", size = "md", ...rest }: Props) {
  // styles['btn-1'] refers to CSS module class that targets hover gradients etc.
  return (
    <BaseButton {...rest} variantClass={styles["btn-1"]} size={size}>
      {children}
    </BaseButton>
  );
}