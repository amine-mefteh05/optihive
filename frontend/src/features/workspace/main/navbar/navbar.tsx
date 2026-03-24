import UserCard from "./user-card";
import Image from "next/image";
function Navbar() {
  return (
    <nav className="flex items-center justify-between pr-5 m-5 rounded-full bg-gray-500/10 backdrop-blur-sm shadow-lg">
      <Image
        src="/logo.png"
        alt="logo"
        width={824}
        height={303}
        className="w-64 h-auto"
      />
      <UserCard />
    </nav>
  );
}

export default Navbar;
