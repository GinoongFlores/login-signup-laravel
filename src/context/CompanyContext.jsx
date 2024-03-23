import React from "react";
import { useContext, createContext } from "react";
import axiosInstance from "../api/axios";
import { toast } from "react-hot-toast";
import useAuthContext from "./AuthContext";
import { UserRole } from "../hooks/UserRole";

// create a context
const CompanyContext = createContext();

// create a provider for the context

export const CompanyProvider = ({ children }) => {
  const { token } = useAuthContext();

  const userRole = UserRole();
  console.log(userRole);

  const addCompany = async (values) => {
    try {
      const response = await axiosInstance.post(
        "/company",
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (token) {
        toast.success(response.data.message, {
          position: "top-center",
        });
      }
      return response;
    } catch (error) {
      // console.log("add company error: ", error.response.data.message.error);
      toast.error(error.response.data.message.error, {
        position: "top-center",
      });
    }
  };

  const deleteCompany = async (id) => {
    try {
      const response = await axiosInstance.delete(`/company/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <CompanyContext.Provider value={{ addCompany, deleteCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

// create a custom hook to use the context
export const useCompanyContext = () => useContext(CompanyContext);
