import { Route, Navigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const PrivateRoutes = ({ element: Component, ...rest }) => {
  const { user } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Navigate to="/login" replace />
      }
    />
  );
};

export default PrivateRoutes;
