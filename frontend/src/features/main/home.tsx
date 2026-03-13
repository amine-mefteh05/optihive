import Button from "@/components/ui/button";
function Home() {
  return (
    <section
      id="home"
      className=" h-full flex flex-col gap-10 items-center justify-center"
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
          Get Started
        </Button>
        <Button size="md" variant="secondary">
          Learn More
        </Button>
      </div>
    </section>
  );
}

export default Home;
