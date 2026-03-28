import { protectedAction } from "@/features/auth/protectedAction";
import Projects from "@/features/workspace/main/projects/projects";
async function Page() {
  await protectedAction();
  return <Projects />;
}

export default Page;
