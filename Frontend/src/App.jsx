import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import Notes from "./pages/Notes.jsx";
import CreateNote from "./pages/CreateNote.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/notes" element={<Notes />}></Route>
        <Route path="/create" element={<CreateNote />}></Route>
      </Routes>
    </div>
  );
};

export default App;
