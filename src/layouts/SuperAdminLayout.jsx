import { Outlet } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import CountCard from "../components/CountCard";
import Home from "../pages/admin/Home";

const SuperAdminLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="container mx-auto px-8 bg-gray-800">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default SuperAdminLayout;
