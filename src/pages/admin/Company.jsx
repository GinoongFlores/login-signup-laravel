import { Link, useNavigate, useLocation } from "react-router-dom";
// import ModalComp from "../../components/flowbite/Modal";

export const CompanyTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabsList = [
    {
      name: "All Company",
      link: "/company",
    },
    {
      name: "Add",
      link: "/company/add",
    },
    {
      name: "Archive",
      link: "/company/archive",
    },
  ];
  return (
    <>
      <div className="sm:hidden bg-gray-800 ">
        <label htmlFor="tabs" className="sr-only">
          Select a options
        </label>
        <select
          id="tabs"
          value={location.pathname} // this will set the selected value in the dropdown
          onChange={(e) =>
            navigate(e.target.value, {
              replace: true, // this will replace the current entry in the history stack
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {tabsList.map((tab, index) => (
            <option key={index} value={tab.link}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        {tabsList.map((tab, index) => (
          <li key={index} className="w-full focus-within:z-10">
            <Link
              to={tab.link}
              className="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
            >
              {tab.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li className="w-full focus-within:z-10">
          <a
            href="#"
            className="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
            aria-current="page"
          >
            Profile
          </a>
        </li>
        <li className="w-full focus-within:z-10">
          <a
            href="#"
            className="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            Dashboard
          </a>
        </li>
        <li className="w-full focus-within:z-10">
          <a
            href="#"
            className="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            Settings
          </a>
        </li>
        <li className="w-full focus-within:z-10">
          <a
            href="#"
            className="inline-block w-full p-4 bg-white border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            Invoice
          </a>
        </li>
      </ul> */}
    </>
  );
};

const Company = () => {
  return (
    <>
      <div className="py-10 flex flex-col">
        <CompanyTabs />
      </div>
    </>
  );
};

export default Company;
