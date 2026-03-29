import React from "react";

type spinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  size: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass = {
  sm: "w-16 h-16 border-2",
  md: "w-32 h-32 border-4",
  lg: "w-64 h-64 border-8",
};

function spinner({ size, className, ...props }: Readonly<spinnerProps>) {
  return (
    <div
      className={`animate-spin rounded-full border-y-transparent border-x-primary ${sizeClass[size]} ${className}`}
      {...props}
    ></div>
  );
}

export default spinner;
