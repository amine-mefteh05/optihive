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
      className={`${className} cursor-pointer flex gap-2 items-center text-md w-64 rounded-r-lg rounded-l-none py-2  ${isActive ? "bg-primary/10 shadow-sm" : "hover:bg-foreground/10"}`}
    >
      {children}
    </NextLink>
  );
}

export default Link;
