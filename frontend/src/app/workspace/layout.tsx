import Navbar from "@/features/workspace/main/navbar/navbar";
import Sidebar from "@/features/workspace/main/sidebar";
function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-w-screen min-h-screen flex flex-col">
      <header className="flex items-center justify-center flex-0">
        <Navbar />
      </header>
      <main className="flex h-full w-full flex-1">
        <Sidebar />
        {children}
      </main>
    </div>
  );
}

export default Layout;
