import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

const authContext = createContext({});

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // prevent user from accessing the login page if already logged in
  useEffect(() => {
    if (location.pathname === "/login" && user) {
      navigate("/", { replace: true });
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      // console.log(response.data);
      return response;
    } catch (error) {
      console.log("get user error: ", error);
      throw error;
    }
  };

  const login = async ({ ...data }) => {
    try {
      const response = await axiosInstance.post("/login", {
        ...data,
      });

      const userToken = response.data.data.token;
      localStorage.setItem("token", userToken);
      if (userToken) {
        await getUser(); // get user data after login
        navigate("/", { replace: true });
        // console.log(response.data.data.name);
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.clear();
      setUser(null);
      navigate("/login", { replace: true });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const register = async ({ ...data }) => {
    try {
      const response = await axiosInstance.post("/register", {
        ...data,
      });
      console.log(response);
      const userToken = response.data.data.token;
      localStorage.setItem("token", userToken);
      if (userToken) {
        await getUser();
        navigate("/", { replace: true });
      } else {
        navigate("/register");
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider
      value={{ loading, user, login, logout, register, getUser }}
    >
      {children}
    </authContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(authContext);
}
