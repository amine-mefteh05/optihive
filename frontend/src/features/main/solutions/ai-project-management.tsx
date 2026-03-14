import Card from "./card";
import { Calendar, Lightbulb, ChartNoAxesCombined } from "lucide-react";
function AiProjectManagement() {
  return (
    <div className="flex flex-col gap-5 items-center">
      <h2 className="text-4xl font-bold text-center">
        AI-Powered Project Management
      </h2>
      <p className="text-foreground/80 text-center">
        Streamline your development workflow with OptiHive's intelligent
        workspace solutions.
      </p>
      <div className="flex gap-5 justify-around max-md:flex-col">
        <Card
          title="AI Scheduling"
          description="Dynamically adjust project timelines based on real-
                       time team velocity, inter-task dependencies, and
                       historical delivery patterns."
          image={<Calendar />}
        />
        <Card
          title="Smart Resource Allocation"
          description="Match the right talent to the right tasks. Our AI
                       analyzes skill graphs and availability to balance
                       workloads across your organization."
          image={<Lightbulb />}
        />
        <Card
          title="Predictive Analytics"
          description="Foresee delays before they happen. Leverage data-
                       driven insights to manage risks and ensure
                       consistent sprint outcomes."
          image={<ChartNoAxesCombined />}
        />
      </div>
    </div>
  );
}

export default AiProjectManagement;
