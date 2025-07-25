import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userValidation = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/check-auth", {
          withCredentials: true,
        });
        if (res.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        setIsAuthenticated(false)
      }
    };

    userValidation();
  }, [navigate]);

  // Show loader or null while checking
  if (isAuthenticated === false) {
    return (
      <nav className="flex items-center justify-between  h-[60px] px-10">
        {/* Logo */}
        <p className="text-2xl">🗺</p>
        {/* login register buttons */}
        <div>
          <button
            className="border text-black p-[6px] rounded cursor-pointer mr-2"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="bg-blue-400 text-white p-2 rounded cursor-pointer"
            onClick={() => {
              navigate("/register")
            }}
          >
            Register
          </button>
        </div>
      </nav>
    );
  }
  if(isAuthenticated === null){
      return <h1>Authenticating...</h1>
  }

  // If authenticated, render the child component (like <Notes />)
  return <>{children}</>;
};

export default CheckAuth;
