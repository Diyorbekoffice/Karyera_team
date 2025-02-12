import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import VerifyEmail from "./pages/VerifyEmail"; 
import Respass from "./pages/Respass";

function App() {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />  
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/respass" element={<Respass />} />
    </Routes>
  );
}

export default App;
