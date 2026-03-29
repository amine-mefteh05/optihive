import { protectedAction } from "@/features/auth/protectedAction";
import Projects from "@/features/workspace/projects/projects";
async function Page() {
  await protectedAction();
  return <Projects />;
}

export default Page;
