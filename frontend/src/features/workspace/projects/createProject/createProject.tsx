import { H3Gradiant } from "@/shared/components/ui/title-gradiant/title-gradiant";
import Form from "./form";
function CreateProject() {
  return (
    <section className="flex flex-col gap-5">
      <H3Gradiant>Create Project</H3Gradiant>
      <Form />
    </section>
  );
}

export default CreateProject;
