import Accordion from "@/shared/components/ui/accordion/accordion";
import { getUserInfo } from "./getUserInfo";
import { AlertCircle } from "lucide-react";
import { Avatar } from "@radix-ui/themes";
import Image from "next/image";
async function UserCard() {
  let user;
  try {
    user = await getUserInfo();
  } catch (error) {
    return (
      <Accordion variant="alert">
        <AlertCircle className="inline mr-2" />
        error
      </Accordion>
    );
  }
  return (
    <div className="flex items-center gap-2 p-0">
      <Avatar
        src={`/avatars/${user?.avatar ?? 1}.svg`}
        fallback={user?.username ?? "user"}
        className="rounded-full"
      />
      <p>{user?.username ?? "user"}</p>
    </div>
  );
}

export default UserCard;
