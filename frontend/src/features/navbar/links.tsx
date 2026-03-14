import Link from "next/link";
import Button from "@/components/ui/button";
function Links() {
  return (
    <div className="flex gap-5 max-md:justify-around max-md:w-full">
      <Link href="#home">
        <Button
          size="md"
          variant="secondary"
          className="underline-on-hover cursor-pointer"
        >
          Home
        </Button>
      </Link>
      <Link href="#solutions">
        <Button
          size="md"
          variant="secondary"
          className="underline-on-hover cursor-pointer"
        >
          Solutions
        </Button>
      </Link>
      <Link href="#about-us">
        <Button
          size="md"
          variant="secondary"
          className="underline-on-hover cursor-pointer"
        >
          About Us
        </Button>
      </Link>
    </div>
  );
}

export default Links;
