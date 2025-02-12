import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";  

const ResetPassword = () => {
  const emailRef = useRef();
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    const email = emailRef.current.value;

    if (!email) {
      console.error("Iltimos, emailni kiriting!");
      return;
    }

    console.log("Yuborilgan email:", { email });

    try {
      await axios.post("user/reset_password/", { email });

      console.log("Parol tiklash so'rovi yuborildi.");

      // Login sahifasiga yo'naltirish
      navigate("/login");
    } catch (error) {
      console.error("Xatolik:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-5 mt-14 gap-3">
      <h2 className="text-2xl mb-4">Parolni tiklash</h2>
      <div className="relative w-full mb-4">
        <input
          id="emailPass"
          ref={emailRef}
          type="email"
          className="py-3 px-2.5 rounded-xl border text-blacknew focus:outline-none focus:ring-2 focus:ring-blue-500 w-full peer focus:border-transparent"
        />
        <label
          htmlFor="emailPass"
          className="absolute left-3 top-3 px-1 transition-all duration-300 bg-white text-pcolor font-medium peer-placeholder-shown:text-black peer-focus:-translate-y-5 peer-focus:text-[#293BFF] peer-focus:text-xs peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-pcolor peer-not-placeholder-shown:text-xs z-10"
        >
          Email
        </label>
      </div>
      <button onClick={handleResetPassword} className="bg-blue-500 text-white px-4 py-2 rounded-[10px] mt-2 w-full">
        Yuborish
      </button>
    </div>
  );
};

export default ResetPassword;
