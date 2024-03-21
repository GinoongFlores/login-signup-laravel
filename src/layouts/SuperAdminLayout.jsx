import { Outlet } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import CountCard from "../components/CountCard";

const SuperAdminLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="container mx-auto px-8">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default SuperAdminLayout;
