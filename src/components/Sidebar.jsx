import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBackward, FaHome, FaUsers, FaBuilding } from "react-icons/fa";
import { MdFullscreenExit } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

import useAuthContext from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuthContext();

  const sidebarLinks = [
    {
      name: "Home",
      icon: <FaHome size={20} />,
      link: "/",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      link: "/users",
    },
    {
      name: "Admin",
      icon: <MdAdminPanelSettings size={20} />,
      link: "/admin",
    },
    {
      name: "Company",
      icon: <FaBuilding />,
      link: "/company",
    },
    {
      name: "Items",
      icon: (
        <svg
          className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
        </svg>
      ),
      link: "/items",
    },
    {
      name: "logout",
      icon: <BiLogOut />,
      // link: "#",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    // console.log(isOpen);
  };

  return (
    <>
      <header>
        <div className=" flex items-center gap-4 border-b border-gray-400">
          <button
            // data-drawer-target="sidebar-multi-level-sidebar"
            // data-drawer-toggle="sidebar-multi-level-sidebar"
            // aria-controls="sidebar-multi-level-sidebar"
            onClick={toggleOpen}
            type="button"
            className="inline-flex items-center p-2 mt-2 mb-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>

          <div className="flex gap-4">
            <div className="rounded-full w-8 h-8 bg-slate-600" />
            <h2>Tracker</h2>
          </div>
        </div>
      </header>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-36 sm:w-64 h-screen transition-transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {/* Sidebar Links */}
          <div className="flex flex-col">
            <div
              className="relative self-end items-end pe-2 pb-4 cursor-pointer visible sm:invisible"
              onClick={toggleOpen}
            >
              <MdFullscreenExit size={20} className="dark:text-gray-400" />
            </div>

            <ul className="space-y-2 font-medium">
              {sidebarLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link}
                    onClick={(e) => {
                      if (link.name === "logout") {
                        e.preventDefault(); // prevent default link behavior
                        logout();
                      } else {
                        toggleOpen();
                      }
                    }}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    {link.icon}
                    <span className="ms-3">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* mobile  */}
    </>
  );
};

export default Sidebar;
