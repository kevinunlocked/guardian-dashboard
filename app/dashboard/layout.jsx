import "../globals.css";
import Sidebar from "../../components/Sidebar.jsx";
import TopNav from "../../components/TopNav.jsx";
import RightPanel from "../../components/RightPanel.jsx";

export const metadata = {
  title: "Guardian Dashboard",
  description: "Unified security monitoring platform",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#071026] text-slate-200">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <TopNav />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>

      <RightPanel />
    </div>
  );
}
