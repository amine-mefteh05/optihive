import Image from "next/image";
import Navbar from "@/features/navbar/navbar";
import Home from "@/features/main/home";
export default function Page() {
  return (
    <>
      <Navbar />
      <main className="h-full">
        <Home />
      </main>
    </>
  );
}
