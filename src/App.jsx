import { Toaster } from "react-hot-toast";

import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route, RouterProvider } from "react-router-dom";
import useAuthContext from "./context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

import SuperAdminLayout from "./layouts/SuperAdminLayout";
import Items from "./pages/admin/Items";
import Users from "./pages/admin/Users";
import Admin from "./pages/admin/Admin";

function App() {
  const { user, loading } = useAuthContext();
  // console.log(user);
  let location = useLocation();

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to={"/login"} replace={true} />;
    // if (!user && location.pathname === "/") {
    //   return <Navigate to={"/login"} replace />;
    // } else if (user && location.pathname === "/login") {
    //   return <Navigate to={"/"} replace />;
    // } else {
    //   return children;
    // }
  };

  // if (loading) {
  //   return (
  //     <div className="h-screen bg:dark-gray-9000 dar:text-white flex justify-center items-center">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <SuperAdminLayout />
              </RequireAuth>
            }
          >
            <Route path="/items" element={<Items />} />
            <Route path="/users" element={<Users />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
