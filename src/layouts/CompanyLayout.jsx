import { Outlet } from "react-router-dom";
import Company from "../pages/admin/Company";
import ViewCompanyPage from "../pages/company/ViewCompanyPage";

const CompanyLayout = () => {
  return (
    <>
      <div>
        <Company />
        {/* <ViewCompanyPage /> */}
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default CompanyLayout;
