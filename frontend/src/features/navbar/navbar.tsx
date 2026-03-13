import Image from "next/image";
import Button from "@/components/ui/button";
import Links from "./links";
import DarkModeToggle from "./darkmode-toggle";
function Navbar() {
  return (
    <header className="flex justify-between shadow-lg items-center px-4 sticky top-0 z-50 bg-background/50 backdrop-blur">
      <Image
        src="/logo.png"
        width={824}
        height={303}
        className="w-64"
        alt="logo"
        loading="eager"
      ></Image>
      <Links />
      <div className="flex gap-4">
        <Button size="md" variant="primary">
          Login
        </Button>
        <Button size="md" variant="secondary">
          Register
        </Button>
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Navbar;
