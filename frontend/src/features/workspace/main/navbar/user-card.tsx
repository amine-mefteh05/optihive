import { getUserInfo } from "./getUserInfo";
import Image from "next/image";
async function UserCard() {
  const user = await getUserInfo();
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
