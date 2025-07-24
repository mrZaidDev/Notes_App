import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import Notes from "./pages/Notes.jsx";
import CreateNote from "./pages/CreateNote.jsx";
import CheckAuth from "./components/CheckAuth.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/notes" element={<CheckAuth><Notes/></CheckAuth>}></Route>
        <Route path="/create" element={<CheckAuth><CreateNote/></CheckAuth>}></Route>
      </Routes>
    </div>
  );
};

export default App;
