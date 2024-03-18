// import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router-dom";
import useAuthContext from "./context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

function App() {
  const { user, loading } = useAuthContext();
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

  if (loading) {
    return (
      <div className="h-screen bg:dark-gray-9000 dar:text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Welcome />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
