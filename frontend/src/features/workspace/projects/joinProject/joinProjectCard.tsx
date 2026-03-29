import { PlusCircle } from "lucide-react";
import Form from "./form";
function JoinProjectCard() {
  return (
    <div className="flex flex-col gap-5 card-dimensions px-2 rounded-lg border border-dashed border-foreground/30 shadow-lg items-center justify-center cursor-pointer">
      <PlusCircle size={40} />
      <h4 className="text-2xl font-bold">Join a project</h4>
      <p className="text-md text-center text-foreground/50">
        Enter invitation code to join a project
      </p>
      <Form />
    </div>
  );
}

export default JoinProjectCard;
