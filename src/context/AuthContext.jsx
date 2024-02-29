import { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";

const authContext = createContext({});

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response;
    } catch (error) {
      console.log("get user error: ", error);
    }
  };

  const login = async ({ ...data }) => {
    try {
      const response = await axiosInstance.post("/login", {
        data,
      });

      const userToken = response.data.data.token;
      localStorage.setItem("token", userToken);

      if (userToken) {
        // console.log(localStorage.getItem("token"));
        navigate("/");
        console.log(response.data.data.name);
      } else {
        navigate("/login");
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider value={{ user, login, getUser }}>
      {children}
    </authContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(authContext);
}
