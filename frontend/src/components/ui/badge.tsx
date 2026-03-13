type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

function Badge({ children, ...props }: BadgeProps) {
  return (
    <div
      {...props}
      className="rounded-md border border-transparent  dark:border-white/20 bg-primary dark:bg-primary/20 text-foreground dark:text-primary p-4 w-fit"
    >
      {children}
    </div>
  );
}

export default Badge;
