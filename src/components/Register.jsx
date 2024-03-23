import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import { useFormik, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../api/axios";
import { useEffect, useState } from "react";

const Register = () => {
  const { register } = useAuthContext();
  const [companies, setCompanies] = useState([]);

  const RegisterSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name Required"),
    last_name: Yup.string().required("Last Name Required"),
    company_name: Yup.string().required("Company Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .max(10, "Must be 10 characters only")
      .min(6, "Minimum of 8 characters only")
      .required("password required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Confirm Password is required"),
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axiosInstance.get("company/view");
        setCompanies(response.data.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchCompanyData();
  }, []);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 relative">
        {/* create an div with rounded corners */}
        <div className="w-full h-[400px] md:h-[250px] mb-10 bg-gray-800 rounded-b-[50px] absolute"></div>
        <div className="flex flex-col justify-center items-center mx-auto px-6 py-8 h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border dark:border-gray-700 z-20">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-1xl font-bold leading-tight tracking-tighter text-gray-900 md:text-2xl dark:text-white">
                Register your Account
              </h1>
              <Formik
                initialValues={{
                  first_name: "",
                  last_name: "",
                  email: "",
                  company_name: "",
                  password: "",
                  confirm_password: "",
                }}
                validationSchema={RegisterSchema}
                onSubmit={(values) => {
                  register(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form action="#" className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First Name
                      </label>
                      <Field
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="John Doe"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.first_name && errors.first_name ? (
                        <div className="dark:text-red-400 text-sm">
                          {errors.first_name}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Name
                      </label>
                      <Field
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="John Doe"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.last_name && errors.last_name ? (
                        <div className="dark:text-red-400 text-sm">
                          {errors.last_name}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required=""
                      />
                      {errors.email && touched.email ? (
                        <div className="dark:text-red-400"> {errors.email}</div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="company_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select Your Company
                      </label>
                      <Field
                        as="select"
                        id="company_name"
                        name="company_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Choose a company</option>
                        {companies.map((company) => (
                          <option key={company.id} value={company.company_name}>
                            {company.company_name}
                          </option>
                        ))}
                      </Field>
                      {errors.company_name && touched.company_name ? (
                        <div
                          className="dark:text-red-400
                           text-sm"
                        >
                          {errors.company_name}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="•••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />

                      {errors.password && touched.password ? (
                        <div className="dark:text-red-400 text-sm">
                          {errors.password}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="confirm_password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        placeholder="•••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />

                      {errors.confirm_password && touched.confirm_password ? (
                        <div className="dark:text-red-400 text-sm">
                          {errors.confirm_password}
                        </div>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Register
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? {""}
                      <Link
                        to={"/"}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign in
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          {/* create an div with rounded corners */}
          <div className="w-full h-[100px] md:h-[50px] bottom-0  bg-gray-800 rounded-t-[50px] absolute"></div>
        </div>
      </section>
    </>
  );
};

export default Register;
