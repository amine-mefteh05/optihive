import { PlusCircle } from "lucide-react";
import Form from "./form";
function JoinProjectCard() {
  return (
    <div className="flex flex-col gap-5 w-64 h-80 px-2 bg-foreground/10 rounded-lg border-3 border-dashed border-foreground/30 shadow-lg items-center justify-center cursor-pointer">
      <PlusCircle size={40} />
      <h4 className="text-2xl font-bold">Join a project</h4>
      <p className="text-lg">Enter invitation code to join a project</p>
      <Form />
    </div>
  );
}

export default JoinProjectCard;
