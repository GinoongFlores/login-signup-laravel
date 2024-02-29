import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const authContext = createContext({});

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [userToken, setUserToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // const location = useLocation();

  // prevent user from accessing the login page if already logged in
  useEffect(() => {
    if (location.pathname === "/login" && user) {
      navigate("/");
    }
  });

  const login = async ({ ...data }) => {
    try {
      const response = await axiosInstance.post("/login", {
        ...data,
      });

      const userToken = response.data.data.token;
      localStorage.setItem("token", userToken);
      if (userToken) {
        // console.log(localStorage.getItem("token"));
        getUser(); // get user data after login
        navigate("/");
        // console.log(response.data.data.name);
      } else {
        navigate("/login");
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    }
  };

  const register = async ({ ...data }) => {
    try {
      const response = await axiosInstance.post("/register", {
        ...data,
      });
      console.log(response.data);
      getUser();
      navigate("/login");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider value={{ user, login, register, getUser }}>
      {children}
    </authContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(authContext);
}
