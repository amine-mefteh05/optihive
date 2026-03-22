import Button from "@/components/ui/button/button";
import Link from "next/link";
function Home() {
  return (
    <section
      id="home"
      className=" h-screen flex flex-col gap-10 items-center text-center justify-center"
    >
      <h1 className="text-6xl font-bold flex flex-col gap-5">
        <div>Organized Devs.</div>
        <div className="text-primary">Optimized Effort.</div>
      </h1>
      <p className="text-lg text-foreground/80">
        Streamline your development workflow with OptiHive's intelligent
        workspace solutions.
      </p>
      <div className="flex gap-5">
        <Button size="md" variant="primary">
          <Link href="/signup">Get Started</Link>
        </Button>
        <Button size="md" variant="secondary">
          <Link href="#solutions">Learn More</Link>
        </Button>
      </div>
    </section>
  );
}

export default Home;
