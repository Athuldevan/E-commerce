import { Link, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import Stats from "./Stats";
import Charts from "./Charts";
import OrdersTable from "./OrdersTable";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
