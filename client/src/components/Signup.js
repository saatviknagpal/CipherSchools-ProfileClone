import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import logo from "../assets/Cipherschools_Logo.png";

export default function Signup() {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetch = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/signup`,
        {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          mobile: formData.mobile === undefined ? "" : formData.mobile,
        }
      );

      const res = fetch.data;
      if (res.status === "success") {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="relative flex flex-col justify-center py-10   overflow-hidden bg-[#F2F5FA] ">
        <ToastContainer />
        <div className="w-11/12 p-6 m-auto bg-white rounded-xl shadow-xl lg:max-w-xl">
          <h1 className="text-2xl p-3 font-semibold">Sign Up</h1>
          <div className="space-y-4">
            <div className="flex justify-center items-center gap-2">
              <img src={logo} alt="Logo" className="h-10 w-10" />
              <p className="font-bold text-xl">CipherSchools</p>
            </div>
            <p className="text-center font-medium text-xl">
              Create New Account
            </p>
            <p className="text-center text-gray-500">
              Please provide your valid informations to signup
            </p>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-800"
              >
                First Name
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-orange-500 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="firstName"
                placeholder="Enter your first name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-800"
              >
                Last Name
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-orange-500 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="lastName"
                placeholder="Enter your last name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2 text-orange-500 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="mobile"
                className="block text-sm font-semibold text-gray-800"
              >
                Phone Number (Optional)
              </label>
              <input
                type="number"
                className="block w-full px-4 py-2 mt-2 text-orange-500 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="mobile"
                placeholder="Enter your phone number"
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-orange-500 bg-white border rounded-md focus:border-orange-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-400"
              >
                Submit
              </button>
            </div>
          </form>

          <p className="mt-8 text-sm font-light text-center text-gray-700">
            {" "}
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-orange-600 hover:underline"
            >
              Signin Now
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
