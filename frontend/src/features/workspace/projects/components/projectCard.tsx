import Badge from "./badge";
import Field from "./field";
import MembershipBadge from "./membership-badge";
type Status = "active" | "completed" | "deadline_passed";
type ProjectCardProps = React.HTMLAttributes<HTMLDivElement> & {
  projectName: string;
  deadline: string;
  Status: Status;
  createdAt: string;
  joinedAt: string;
  projectCreatedAt: string;
  role: string;
};

const formatDate = (date: string) => {
  return new Date(date).toDateString();
};

function ProjectCard({
  projectName,
  deadline,
  Status,
  createdAt,
  joinedAt,
  projectCreatedAt,
  role,
  ...props
}: Readonly<ProjectCardProps>) {
  return (
    <div
      {...props}
      className="flex flex-col gap-2 rounded-lg shadow-lg w-64 h-80 border border-foreground/20 overflow-hidden cursor-pointer hover:bg-foreground/5"
    >
      <h4 className="text-2xl font-bold text-center bg-primary/50">
        {projectName}
      </h4>
      <div className="flex flex-col mt-auto p-2 gap-4">
        <Field label="deadline" value={formatDate(deadline)} />
        <Field label="Created at" value={formatDate(createdAt)} />
        <Field label="Joined at" value={formatDate(joinedAt)} />
        <Field
          label="Project created at"
          value={formatDate(projectCreatedAt)}
        />
        <div className="flex items-center justify-between gap-2 p-2">
          <Badge status={Status} />
          <MembershipBadge role={role as "project_manager" | "member"} />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
