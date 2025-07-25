import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import Notes from "./pages/Notes.jsx";
import CreateNote from "./pages/CreateNote.jsx";
import CheckAuth from "./components/CheckAuth.jsx";
import ProtectNav from "./components/ProtectNav.jsx";
const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ProtectNav>
        <nav className="flex items-center justify-between  h-[60px] px-10">
          {/* Logo */}
          <p className="text-2xl">🗺</p>
          {/* login register buttons */}
          <div>
            <button
              className="border text-black p-[6px] rounded cursor-pointer mr-2"
              onClick={() => navigate("/")}
            >
              All Notes
            </button>
            <button
              className="bg-blue-400 text-white p-2 rounded cursor-pointer"
              onClick={() => navigate("/create")}
            >
              Create New Note
            </button>
          </div>
        </nav>
      </ProtectNav>
      <Routes>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/"
          element={
            <CheckAuth>
              <Notes />
            </CheckAuth>
          }
        ></Route>
        <Route
          path="/create"
          element={
            <CheckAuth>
              <CreateNote />
            </CheckAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
