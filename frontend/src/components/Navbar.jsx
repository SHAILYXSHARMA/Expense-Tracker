import React from "react";
import axios from "axios";
import Logo from "./shared/logo";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Logout successful!");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Logout failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "An error occurred while logging out."
      );
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full border-b border-gray-300 z-50 bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4">
        <Logo />
        <div>
          {user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <Button onClick={logoutHandler}>Logout</Button>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
