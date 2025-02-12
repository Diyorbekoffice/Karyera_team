import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios";  

const VerifyEmail = () => {
  const codeRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Register sahifasidan kelgan email

  const handleVerify = async () => {
    const verificationCode = codeRef.current.value;

    if (!email || !verificationCode) {
      console.error("Email yoki tasdiqlash kodini kiriting!");
      return;
    }

    try {
      const response = await axios.post("/user/verify-email/", { email, verification_code: verificationCode });

      console.log("Server javobi:", response.data);
      
      if (response.data.message === "Email verified successfully") {
        console.log("Email muvaffaqiyatli tasdiqlandi.");
        navigate("/Login"); // Login sahifasiga yo‘naltiramiz
      }
    } catch (error) {
      console.error("Xatolik:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Emailni tasdiqlash</h2>
      <p className="mb-2">Iltimos, {email} email manziliga kelgan kodni kiriting.</p>
      <input ref={codeRef} type="text" placeholder="Tasdiqlash kodi" className="border p-2 mb-2 w-64 text-center" />
      <button onClick={handleVerify} className="bg-green-500 text-white px-4 py-2 rounded mt-2">Tasdiqlash</button>
    </div>
  );
};

export default VerifyEmail;
