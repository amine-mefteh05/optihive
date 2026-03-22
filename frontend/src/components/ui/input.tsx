type inputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

function input({ className, ...props }: Readonly<inputProps>) {
  return (
    <input
      className={`${className} px-4 py-2 border-foreground/20 border rounded-lg cursor-pointer`}
      {...props}
    />
  );
}

export default input;
