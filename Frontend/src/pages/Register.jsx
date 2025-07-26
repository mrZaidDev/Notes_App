import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [toast, setToast] = useState("");
  // Handling Form Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/register", form, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      setToast(error.response.data.message);
    }
  };
  return (
    <div className="m-auto max-w-[80%] border h-[80vh] mt-20 p-5 flex flex-col gap-10 md:max-w-[500px] rounded-xl">
      <h1 className="text-4xl text-center font-semibold pt-10">
        Register Form
      </h1>
      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        {/* username label+input */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-[22px]">
            Username
          </label>
          <input
            id="name"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            type="text"
            className="border h-9 rounded pl-2"
            required
          />
        </div>
        {/* Email label+input */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-[22px]">
            Email
          </label>
          <input
            id="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            className="border h-9 rounded pl-2"
            required
          />
        </div>
        {/* password label+input */}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-[22px]">
            Password
          </label>
          <input
            id="password"
            minLength="6"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            className="border h-9 rounded pl-2"
            required
          />
        </div>
        {/* Submit Button */}
        <input
          type="submit"
          className="bg-blue-400 text-white p-2 mt-8 cursor-pointer"
        />
      </form>
      {toast ? <p className="text-red-500">{toast}</p> : null}
    </div>
  );
};

export default Register;
