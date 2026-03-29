import { Badge as RadixBadge } from "@radix-ui/themes";
import { Check, Clock, AlertCircle } from "lucide-react";
type Status = "active" | "completed" | "deadline_passed";
const badgeColor: Record<Status, "blue" | "green" | "red"> = {
  active: "blue",
  completed: "green",
  deadline_passed: "red",
};
const CustomBadge = ({ status }: Readonly<{ status: Status }>) => {
  return (
    <RadixBadge
      color={badgeColor[status]}
      size="3"
      variant="surface"
      className="flex items-center gap-1"
    >
      {status === "active" ? (
        <Clock size={12} strokeWidth={2.5} />
      ) : status === "completed" ? (
        <Check size={12} strokeWidth={2.5} />
      ) : (
        <AlertCircle size={12} strokeWidth={2.5} />
      )}
      {status}
    </RadixBadge>
  );
};
export default CustomBadge;
