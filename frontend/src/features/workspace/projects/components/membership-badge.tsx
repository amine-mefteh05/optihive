import { User, Star } from "lucide-react";
import { Badge } from "@radix-ui/themes";
type MembershipBadgeProps = {
  role: "project_manager" | "member";
};

const badgeColor: Record<MembershipBadgeProps["role"], "blue" | "green"> = {
  project_manager: "blue",
  member: "green",
};
function MembershipBadge({ role }: Readonly<MembershipBadgeProps>) {
  return (
    <Badge color={badgeColor[role]} size="3" variant="surface">
      {role === "project_manager" ? (
        <Star size={12} strokeWidth={2.5} />
      ) : (
        <User size={12} strokeWidth={2.5} />
      )}
      {role}
    </Badge>
  );
}

export default MembershipBadge;
