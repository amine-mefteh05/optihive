import { H3Gradiant } from "@/shared/components/ui/title-gradiant/title-gradiant";
import { getProjectsAction } from "./getProjectsAction";
import JoinProjectCard from "./joinProject/joinProjectCard";
import ProjectCard from "./components/projectCard";
async function Projects() {
  const projects = await getProjectsAction();
  return (
    <div className="flex flex-col gap-5">
      <H3Gradiant>Projects</H3Gradiant>
      <div className="flex flex-wrap gap-5">
        <JoinProjectCard />
        {projects.map((project: any) => (
          <ProjectCard
            key={project._id}
            projectName={project.projectName}
            deadline={project.deadline}
            Status={project.Status}
            joinedAt={project.joinedAt}
            projectCreatedAt={project.projectCreatedAt}
            role={project.role}
            createdAt={project.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;
