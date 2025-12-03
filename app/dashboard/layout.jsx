import "../globals.css";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import RightPanel from "@/components/RightPanel";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Top Navigation */}
        <TopNav />

        {/* Main Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Right Side Panel */}
      <RightPanel />
    </div>
  );
}
