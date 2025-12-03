import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import RightPanel from "@/components/RightPanel";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#071026]">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Panel */}
      <div className="flex-1 flex flex-col">
        <TopNav />

        <main className="p-6 space-y-6">
          {children}
        </main>
      </div>

      {/* Right Panel */}
      <RightPanel />
    </div>
  );
}
