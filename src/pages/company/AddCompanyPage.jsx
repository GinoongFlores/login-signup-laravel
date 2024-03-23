import { Link } from "react-router-dom";
// import useAuthContext from "../context/AuthContext";
import { useFormik, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import useAuthContext from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import { toast } from "react-hot-toast";
import { UserRole } from "../../hooks/UserRole";

const AddCompanyPage = () => {
  const { token } = useAuthContext();
  const userRole = UserRole();
  const superAdmin = userRole === "super_admin";
  // console.log(userRole);

  const registerCompany = Yup.object().shape({
    company_name: Yup.string().required("Company name is required"),
  });

  useEffect(() => {
    if (userRole !== "super_admin") {
      toast.error("You are not authorized to add a company.", {
        position: "top-center",
        id: "add-company",
      });
      return;
    }
  });

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
      toast.success("Company added successfully");
      return response;
    } catch (error) {
      // console.log("add company error: ", error.response.data.message.error);
      toast.error(error.response.data.message.error, {
        position: "top-center",
      });
    }
  };

  // useEffect(() => {});

  return (
    <>
      {superAdmin && (
        <section className="h-screen">
          {/* create an div with rounded corners */}
          <div className="flex flex-col justify-center items-center mx-auto px-6 py-8 md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border dark:border-gray-700 z-20">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-1xl font-bold leading-tight tracking-tighter text-gray-900 md:text-2xl dark:text-white">
                  Add a Company
                </h1>
                <Formik
                  initialValues={{
                    company_name: "",
                  }}
                  validationSchema={registerCompany}
                  onSubmit={(values) => {
                    addCompany(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form action="#" className="space-y-4 md:space-y-6">
                      <div>
                        <label
                          htmlFor="company_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Company name
                        </label>
                        <Field
                          type="text"
                          id="company_name"
                          name="company_name"
                          placeholder="Hustle Hard LLC"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {errors.company_name && touched.company_name ? (
                          <div className="text-red-800 dark:text-red-400 text-sm">
                            {errors.company_name}
                          </div>
                        ) : null}
                      </div>

                      <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Add a Company
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            {/* create an div with rounded corners */}
          </div>
        </section>
      )}
    </>
  );
};

export default AddCompanyPage;
