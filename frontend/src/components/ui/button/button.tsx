type buttonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size: "sm" | "md" | "lg";
  variant: "primary" | "secondary";
  className?: string;
};

const sizeClass = {
  sm: "text-sm px-2 py-1",
  md: "text-md px-4 py-2",
  lg: "text-lg px-6 py-3",
};

const variantClass = {
  primary: "bg-primary text-[#171717] hover:bg-primary-hover",
  secondary: "bg-background hover:bg-foreground/10",
};

function button({
  size = "md",
  variant = "primary",
  children,
  className,
  ...props
}: Readonly<buttonProps>) {
  return (
    <button
      className={`${sizeClass[size]} ${className} ${variantClass[variant]} rounded-lg cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
}

export default button;
