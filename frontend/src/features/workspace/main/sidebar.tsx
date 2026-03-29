import { LogOut, Settings, Grid3x3, Plus, User } from "lucide-react";
import Link from "@/features/workspace/components/link";
import { H4Gradiant } from "@/shared/components/ui/title-gradiant/title-gradiant";
import logoutAction from "./logoutAction";
function Sidebar() {
  return (
    <aside className="w-64 min-h-full flex flex-col gap-5 py-5 justify-between px-0 shadow-lg">
      <div className="flex flex-col gap-2">
        <H4Gradiant className="mb-2 px-2">OptiHive</H4Gradiant>
        <Link href="/workspace" className="px-5 py-2 text-foreground">
          <Grid3x3 size={20} />
          <p>Projects</p>
        </Link>
        <Link href="/workspace/new" className="px-5 py-2 text-foreground">
          <Plus size={20} />
          <p>New Project</p>
        </Link>
        <Link href="/workspace/profile" className="px-5 py-2 text-foreground">
          <User size={20} />
          <p>Profile</p>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <Link href="/settings" className="px-5 py-2 text-foreground">
          {/*TODO: add settings page */}
          <Settings size={20} />
          <p>Settings</p>
        </Link>
        <button
          className="cursor-pointer flex gap-2 px-5 items-center text-md w-64 rounded-none border-r-8 py-2 hover:bg-foreground/10 border-foreground/50 text-foreground"
          onClick={logoutAction}
        >
          <LogOut size={20} />
          <p>Logout</p>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
