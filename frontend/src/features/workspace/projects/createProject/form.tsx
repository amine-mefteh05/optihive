"use client";
import Input from "@/shared/components/ui/input/input";
import Button from "@/shared/components/ui/button/button";
import Textarea from "@/shared/components/ui/textarea/textarea";
import useForm from "@/shared/hooks/useForm";
import { createProjectAction } from "./createProjectAction";
function Form() {
  const { formAction, isPending } = useForm({
    action: createProjectAction,
    successMessage: "Project created successfully",
    errorMessage: "Failed to create project",
  });
  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 shadow-lg p-4 border border-foreground/20 rounded-lg flex-1"
    >
      <label htmlFor="name">
        Project Name : <span className="text-red-500 text-xl font-bold">*</span>
      </label>
      <Input id="name" type="text" placeholder="Project Name" name="name" />
      <label htmlFor="description">Project Description :</label>{" "}
      {/*project description is optional */}
      <Textarea
        id="description"
        placeholder="Project Description"
        name="description"
      />
      <label htmlFor="deadline">
        Deadline : <span className="text-red-500 text-xl font-bold">*</span>
      </label>
      <Input
        id="deadline"
        type="date"
        placeholder="Deadline"
        name="deadline"
        required
        className="dark:[&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:size-7 [&::-webkit-calendar-picker-indicator]:cursor-pointer transition-all duration-300 ease-in-out"
      />
      <Button type="submit" size="md" variant="primary" disabled={isPending}>
        {isPending ? "Creating..." : "Create Project"}
      </Button>
    </form>
  );
}

export default Form;
