"use client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
type linkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};
function Link({ children, href, className = "" }: Readonly<linkProps>) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <NextLink
      href={href}
      className={`${className} cursor-pointer flex gap-2 items-center text-md w-64 rounded-none border-r-8 py-2 hover:bg-foreground/10 ${isActive ? "border-primary" : "border-foreground/50"}`}
    >
      {children}
    </NextLink>
  );
}

export default Link;
