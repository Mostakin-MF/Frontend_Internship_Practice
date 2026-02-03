import React from "react";

function GlowCircle({
  size = 400,          // width & height in px
  top = -100,          // top position in px
  left = -100,         // left position in px
  color = "purple-300", // Tailwind color
  opacity = 70,        // Tailwind opacity (0-100)
  blur = "blur-3xl",   // Tailwind blur
  animation = "animate-blob", // optional animation class
  delay = "animation-delay-2000", // optional animation delay
  className = "",
  ...props
}) {
  return (
    <div
      className={`
        absolute 
        rounded-full 
        ${blur} 
        bg-${color} 
        opacity-${opacity} 
        ${animation} 
        ${delay}
        ${className}
      `}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}px`,
        left: `${left}px`,
        mixBlendMode: "normal",
      }}
      {...props}
    ></div>
  );
}

export default GlowCircle;
