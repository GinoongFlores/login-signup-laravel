import { Children, createContext, useContext, useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/user");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      if (response.data.data.token) {
        localStorage.setItem("access_token", response.data.data.token);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
