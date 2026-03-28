import Accordion from "@/shared/components/ui/accordion/accordion";
import { getUserInfo } from "./getUserInfo";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
async function UserCard() {
  let user;
  try {
    user = await getUserInfo();
  } catch (error) {
    console.error(error);
    return (
      <Accordion variant="alert">
        <AlertCircle className="inline mr-2" />
        error
      </Accordion>
    );
  }
  return (
    <div className="flex items-center gap-2 p-0">
      <Image
        src={`/avatars/${user.avatar}.svg`}
        alt="avatar"
        width={50}
        height={50}
        className="rounded-full"
      />
      <p>{user.username}</p>
    </div>
  );
}

export default UserCard;
