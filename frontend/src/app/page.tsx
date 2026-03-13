import Image from "next/image";
import Navbar from "@/features/navbar/navbar";
import Home from "@/features/main/home";
import Solutions from "@/features/main/solutions/solutions";
export default function Page() {
  return (
    <>
      <Navbar />
      <main className="h-full">
        <Home />
        <Solutions />
      </main>
    </>
  );
}
