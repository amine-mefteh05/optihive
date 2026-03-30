type tipProps = {
  title: string;
  description: string;
  number: number;
};

function Tip({ title, description, number }: tipProps) {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex items-center gap-2 text-xl">
        <span className="bg-primary/50 size-9 text-amber-900 dark:text-amber-100 flex items-center justify-center rounded-full p-1 font-bold">
          {number}
        </span>
        <h3 className=" font-semibold">{title}</h3>
      </div>
      <p className="text-foreground/50">{description}</p>
    </div>
  );
}

export default Tip;
