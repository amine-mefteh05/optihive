import { Suspense } from "react";
import UserCard from "./user-card";
import Image from "next/image";
import Accordion from "@/components/ui/accordion/accordion";
function Navbar() {
  return (
    <nav className="flex items-center justify-between pr-5 w-full bg-gray-500/10 backdrop-blur-sm shadow-lg">
      <Image
        src="/logo.png"
        alt="logo"
        width={824}
        height={303}
        className="w-64 h-auto"
        priority
      />
      <Suspense fallback={<Accordion>loading...</Accordion>}>
        <UserCard />
      </Suspense>
    </nav>
  );
}

export default Navbar;
