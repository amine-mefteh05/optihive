import { User, Star } from "lucide-react";

type MembershipBadgeProps = {
  role: "project_manager" | "member";
};

const roleConfig = {
  project_manager: {
    label: "Project Manager",
    icon: Star,
    className: `
      bg-gradient-to-r 
      text-amber-700
      border border-amber-500/25
      shadow-sm shadow-amber-500/10
      from-amber-500/25 to-yellow-500/20
      border-amber-400/40
      dark:text-amber-500    
      `,
    iconClassName: "text-amber-400 fill-amber-400/30",
  },
  member: {
    label: "Member",
    icon: User,
    className: `
      bg-foreground/20
      border-foreground/20
      text-foreground/80
    `,
    iconClassName: "text-foreground/50",
  },
};

function MembershipBadge({ role }: MembershipBadgeProps) {
  const {
    label,
    icon: Icon,
    className,
    iconClassName,
  } = roleConfig["project_manager"];

  return (
    <div
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1
        rounded-md
        text-xs font-medium tracking-wide
        transition-all duration-200 cursor-default select-none
        w-fit
        ${className}
      `}
    >
      <Icon size={12} className={iconClassName} strokeWidth={2.5} />
      {label}
    </div>
  );
}

export default MembershipBadge;
