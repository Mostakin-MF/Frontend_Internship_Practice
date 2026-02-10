import React from "react";
import BaseButton from "../BaseButton";
import styles from "../animated-buttons.module.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

export default function BorderSweepButton({ children = <span>Read More</span>, size = "md", ...rest }: Props) {
  // btn-3 needs inner span to animate borders — here we pass a span as children
  return (
    <BaseButton {...rest} variantClass={styles["btn-3"]} size={size}>
      <span>{children}</span>
    </BaseButton>
  );
}