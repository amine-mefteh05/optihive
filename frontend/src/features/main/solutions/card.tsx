import Badge from "@/components/ui/badge";
type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  image: React.ReactNode;
};
function Card({ title, description, image, ...props }: CardProps) {
  return (
    <div
      {...props}
      className="flex flex-col gap-5 border border-transparent dark:border-white/20 dark:shadow-lg rounded-lg p-8 max-w-96"
    >
      <Badge>{image}</Badge>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-foreground/80 text-md">{description}</p>
    </div>
  );
}

export default Card;
