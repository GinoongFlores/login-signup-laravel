// import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router-dom";
import useAuthContext from "./context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

function App() {
  const { user } = useAuthContext();
  const location = useLocation();

  const RequireAuth = ({ children }) => {
    if (!user && location.pathname === "/") {
      return <Navigate to={"/login"} replace />;
    } else if (user && location.pathname === "/login") {
      return <Navigate to={"/"} replace />;
    } else {
      return children;
    }
  };
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
        <Route
          path="/login"
          element={
            <RequireAuth>
              <Login />
            </RequireAuth>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
