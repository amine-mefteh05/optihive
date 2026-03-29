"use client";
import Input from "@/shared/components/ui/input/input";
import Button from "@/shared/components/ui/button/button";
import Textarea from "@/shared/components/ui/textarea/textarea";
function Form() {
  return (
    <form className="flex flex-col gap-5 w-1/2">
      <Input type="text" placeholder="Project Name" name="name" />
      <Textarea placeholder="Project Description" name="description" />
      <Input
        type="date"
        placeholder="Deadline"
        name="deadline"
        className="dark:[&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:size-7 [&::-webkit-calendar-picker-indicator]:cursor-pointer transition-all duration-300 ease-in-out"
      />
      <Button type="submit" size="sm" variant="primary">
        Create Project
      </Button>
    </form>
  );
}

export default Form;
