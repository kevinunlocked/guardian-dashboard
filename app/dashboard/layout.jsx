import Sidebar from "../../components/Sidebar";
import TopNav from "../../components/TopNav";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <TopNav />
        <main className="p-10">{children}</main>
      </div>
    </div>
  );
}
