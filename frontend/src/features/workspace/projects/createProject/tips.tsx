import { Lightbulb } from "lucide-react";
import Tip from "./tip";
function Tips() {
  return (
    <div className="flex-1 flex flex-col gap-5 border border-foreground/20 bg-foreground/5 rounded-lg p-4">
      <div className="flex items-center gap-2 ">
        <Lightbulb className="text-yellow-500" size={50} />
        <h3 className="text-3xl font-semibold"> Hive Tips</h3>
      </div>
      <div className="flex flex-col gap-5 flex-1 justify-evenly">
        <Tip
          title="Keep names concise"
          description="Short names are easier to reference in team mentions and navigation."
          number={1}
        />
        <Tip
          title="Define milestones"
          description="Use the description to list at least three key outcomes for this project phase."
          number={2}
        />
        <Tip
          title="Set realistic dates"
          description="Choose a deadline that allows for unexpected delays and buffer time."
          number={3}
        />
      </div>
    </div>
  );
}

export default Tips;
