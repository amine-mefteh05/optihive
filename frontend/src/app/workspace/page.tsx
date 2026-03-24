import { protectedAction } from "@/features/auth/protectedAction";
import Main from "@/features/workspace/main/main";
async function Page() {
  await protectedAction();
  return <Main />;
}

export default Page;
