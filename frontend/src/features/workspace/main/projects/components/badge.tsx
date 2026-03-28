type Status = "active" | "completed" | "deadline_passed";
const badgeStyle = {
  completed: "text-green-700 border border-green-700/20 bg-green-700/20",
  active: "border border-cyan-700 bg-cyan-700/20 text-cyan-700",
  deadline_passed: "text-red-700 border border-red-700/20 bg-red-700/20",
};
const Badge = ({ status }: Readonly<{ status: Status }>) => {
  return (
    <span
      className={`text-sm w-fit px-2 py-1 rounded-full ${badgeStyle[status]}`}
    >
      {status}
    </span>
  );
};
export default Badge;
