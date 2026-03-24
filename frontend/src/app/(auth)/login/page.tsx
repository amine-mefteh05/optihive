import Login from "@/features/auth/login/login";
import Image from "next/image";
import { reverseProtectedAction } from "@/features/auth/protectedAction";
async function Page() {
  await reverseProtectedAction();
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <Image
        src="/logo.png"
        alt="logo"
        width={824}
        height={303}
        className="w-96"
      />
      <Login />
    </div>
  );
}

export default Page;
