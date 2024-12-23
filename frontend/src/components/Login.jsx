import React, { useState } from "react";
import Logo from "./shared/logo";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // State to handle button loading
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input change
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Assuming API response has `data.success` and `data.message`
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user))
        toast.success(res.data.message || "Login successful!");
        navigate("/"); // Redirect to home or dashboard
      } else {
        toast.error(res.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <Toaster /> {/* Toast notification container */}
      <form
        onSubmit={submitHandler}
        className="bg-white w-96 p-8 shadow-lg rounded-lg"
      >
        <div className="w-full flex justify-center mb-5">
          <Logo />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={input.email}
            onChange={changeHandler}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={changeHandler}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <Button
          type="submit"
          className={`w-full py-2 my-5 text-white bg-blue-600 rounded-md hover:bg-blue-700 ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
