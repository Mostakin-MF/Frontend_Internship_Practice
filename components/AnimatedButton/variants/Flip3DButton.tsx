import React from "react";
import BaseButton from "../BaseButton";
import styles from "../animated-buttons.module.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

export default function Flip3DButton({ children = "Read More", size = "md", ...rest }: Props) {
  // btn-12 needs TWO spans (front/back) to produce the flip effect
  return (
    <BaseButton {...rest} variantClass={styles["btn-12"]} size={size}>
      <span>{children}</span>
      <span>{children}</span>
    </BaseButton>
  );
}