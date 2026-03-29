import Navbar from "@/features/workspace/main/navbar/navbar";
import Sidebar from "@/features/workspace/main/sidebar";
function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-center flex-0">
        <Navbar />
      </header>
      <main className="flex h-full w-full flex-1">
        <Sidebar />
        <section className="flex-1 p-5">{children}</section>
      </main>
    </div>
  );
}

export default Layout;
