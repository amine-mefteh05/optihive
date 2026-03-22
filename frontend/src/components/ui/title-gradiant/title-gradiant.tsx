type titleGradiantProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  className?: string;
};
type titleGradiantFatherProps = titleGradiantProps & {
  level: 1 | 2 | 3 | 4 | 5 | 6;
};
export function H1Gradiant({
  children,
  className,
  ...props
}: Readonly<titleGradiantProps>) {
  return (
    <h1
      className={`${className} text-6xl font-bold bg-linear-to-r from-primary to-foreground bg-clip-text text-transparent`}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2Gradiant({
  children,
  className,
  ...props
}: Readonly<titleGradiantProps>) {
  return (
    <h2
      className={`${className} text-5xl font-bold bg-linear-to-r from-primary to-foreground bg-clip-text text-transparent`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3Gradiant({
  children,
  className,
  ...props
}: Readonly<titleGradiantProps>) {
  return (
    <h3
      className={`${className} text-4xl font-bold bg-linear-to-r from-primary to-foreground bg-clip-text text-transparent`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4Gradiant({
  children,
  className,
  ...props
}: Readonly<titleGradiantProps>) {
  return (
    <h4
      className={`${className} text-3xl font-bold bg-linear-to-r from-primary to-foreground bg-clip-text text-transparent`}
      {...props}
    >
      {children}
    </h4>
  );
}

export function H5Gradiant({
  children,
  className,
  ...props
}: Readonly<titleGradiantProps>) {
  return (
    <h5
      className={`${className} text-2xl font-bold bg-linear-to-r from-primary to-foreground bg-clip-text text-transparent`}
      {...props}
    >
      {children}
    </h5>
  );
}

export function H6Gradiant({
  children,
  className,
  ...props
}: Readonly<titleGradiantProps>) {
  return (
    <h6
      className={`${className} text-xl font-bold bg-linear-to-r from-primary to-foreground bg-clip-text text-transparent`}
      {...props}
    >
      {children}
    </h6>
  );
}

export default function TitleGradiant({
  children,
  className,
  level,
  ...props
}: Readonly<titleGradiantFatherProps>) {
  switch (level) {
    case 1:
      return <H1Gradiant {...props}>{children}</H1Gradiant>;
    case 2:
      return <H2Gradiant {...props}>{children}</H2Gradiant>;
    case 3:
      return <H3Gradiant {...props}>{children}</H3Gradiant>;
    case 4:
      return <H4Gradiant {...props}>{children}</H4Gradiant>;
    case 5:
      return <H5Gradiant {...props}>{children}</H5Gradiant>;
    case 6:
      return <H6Gradiant {...props}>{children}</H6Gradiant>;
    default:
      return <H1Gradiant {...props}>{children}</H1Gradiant>;
  }
}
