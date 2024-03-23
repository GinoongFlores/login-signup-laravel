import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const authContext = createContext({});

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getToken = localStorage.getItem("token");

  // prevent user from accessing the login page if already logged in
  useEffect(() => {
    if (location.pathname === "/login" && user) {
      navigate("/", { replace: true });
    }
  });

  // show loading screen while fetching user data
  useEffect(() => {
    if (getToken) {
      getUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [getToken]);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      setToken(token);
      const response = await axiosInstance.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response);
      setUser(response.data);
      return response;
    } catch (error) {
      console.log("get user error: ", error.response);
      // throw error;
    }
  };

  const login = async ({ ...data }) => {
    try {
      const response = await axiosInstance.post("/login", {
        ...data,
      });
      // console.log(response);
      const userToken = response.data.token;
      localStorage.setItem("token", userToken);
      if (userToken) {
        await getUser();
        navigate("/", { replace: true });
        toast.success("Logged in successfully", {
          position: "top-center",
        });
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      // console.log(error.response);
      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const addCompany = async (data) => {
    try {
      const response = await axiosInstance.post("/company", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  // first register
  const register = async ({ ...data }) => {
    try {
      const response = await axiosInstance.post("/register", {
        ...data,
      });
      const userToken = response.data.token;
      localStorage.setItem("token", userToken);
      if (userToken) {
        await getUser();
        navigate("/", { replace: true });
        toast.success("Logged in successfully", {
          position: "top-center",
        });
      } else {
        navigate("/register");
      }
      return response;
    } catch (error) {
      // console.log(error);
      const errors = error.response.data.message.error;
      for (const field in errors) {
        errors[field].forEach((errorMessage) => {
          toast.error(`${errorMessage}`);
        });
      }
      // toast.error(error.response.data.message);
      // toast.error(
      //   typeof errorMessage === "object"
      //     ? JSON.stringify(errorMessage)
      //     : errorMessage
      // );
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
      toast.success("Logged out successfully");

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider
      value={{
        loading,
        user,
        login,
        logout,
        register,
        getUser,
        token,
        addCompany,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(authContext);
}
