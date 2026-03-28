type accordionProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "alert";
};

const variants = {
  default: "text-foreground border-foreground/20 border-1",
  alert: "text-red-500 border-red-500 bg-red-500/10 border-1",
};
function accordion({
  children,
  className,
  variant = "default",
  ...props
}: Readonly<accordionProps>) {
  return (
    <div
      className={`${className} ${variants[variant]} rounded-lg px-2 py-1 bg-foreground/10`}
      {...props}
    >
      {children}
    </div>
  );
}

export default accordion;
