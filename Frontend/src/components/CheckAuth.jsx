import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const CheckAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userValidation = async () => {
      try {
        const res = await axiosInstance.get("/check-auth", {
          withCredentials: true,
        });
        if (res.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    userValidation();
  }, [navigate]);

  // Show loader or null while checking
  if (isAuthenticated === null) {
    return <div className="p-5 text-xl">Checking authentication...</div>;
  }

  // If authenticated, render the child component (like <Notes />)
  return <>{children}</>;
};

export default CheckAuth;
