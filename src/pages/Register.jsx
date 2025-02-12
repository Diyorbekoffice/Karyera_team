import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import aye from "../assets/aye_icon.svg";
import ayeOf from "../assets/ayeOf_icon.svg";
import google from "../assets/google.svg";


const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false); // Password confirm visibility state
  const navigate = useNavigate();

  const handleRegister = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    if (!email || !password || !passwordConfirm) {
      console.error("Iltimos, email, parol va parolni tasdiqlashni kiriting!");
      return;
    }

    if (password !== passwordConfirm) {
      console.error("Parollar mos kelmaydi!");
      return;
    }

    try {
      const response = await axios.post("/user/register/", {
        email,
        password,
        password_confirm: passwordConfirm,
      });

      if (response.data.message === "User registered successfully") {
        console.log("Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi.");

        // Foydalanuvchini VerifyEmail sahifasiga email bilan yo‘naltiramiz
        navigate("/VerifyEmail", { state: { email } });
      }
    } catch (error) {
      console.error("Xatolik:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[600px]  p-6 bg-white gap-2">
      <h2 className="text-3xl mb-4 font-bold">Ro'yxatdan o'tish</h2>
      <p className="text-pcolor">iltimos faol email manzil kiriting</p>

      <div className="relative w-full mb-4">
        <input
          id="emailRes"
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="py-3 px-2.5 rounded-xl border text-blacknew focus:outline-none focus:ring-2 focus:ring-blue-500 w-full peer focus:border-transparent"
        />
        <label
          htmlFor="emailRes"
          className="absolute left-2.5 top-3 px-1 transition-all duration-300 bg-white text-pcolor font-medium 
    peer-focus:-translate-y-5 peer-focus:text-[#293BFF] peer-focus:text-xs 
    peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-pcolor peer-not-placeholder-shown:text-xs z-10"
        >
          Email
        </label>
      </div>

      {/* Password input */}
      <div className="relative w-full mb-4">
        <input
        id="passwordRes"
          ref={passwordRef}
          type={showPassword ? "text" : "password"}
          placeholder="Parol"
          className="py-3 px-2.5 rounded-xl border focus:border-none text-blacknew focus:outline-none focus:ring-2 focus:ring-blue-500 w-full peer"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 cursor-pointer text-lg"
        >
          <img
            src={showPassword ? aye : ayeOf}
            alt="Password visibility"
            className="w-6 h-6"
          />
        </span>
        <label
          htmlFor="passwordRes"
          className="absolute left-2.5 top-3 px-1 transition-all duration-300 bg-white text-pcolor font-medium 
          peer-focus:-translate-y-5 peer-focus:text-[#293BFF] peer-focus:text-xs 
          peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-pcolor peer-not-placeholder-shown:text-xs"
        >
          Parol
        </label>
      </div>

      {/* Password Confirm input */}
      <div className="relative w-full mb-4">
        <input
          ref={passwordConfirmRef}
          id="passwordConfirm"
          type={showPasswordConfirm ? "text" : "password"} // Updated to use separate state
          placeholder="Parolni tasdiqlash"
          className="py-3 px-2.5 rounded-xl border focus:border-none text-blacknew focus:outline-none focus:ring-2 focus:ring-blue-500 w-full peer"
        />
        <span
          onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} // Toggled separately
          className="absolute right-3 top-3 cursor-pointer text-lg"
        >
          <img
            src={showPasswordConfirm ? aye : ayeOf}
            alt="Password visibility"
            className="w-6 h-6"
          />
        </span>
        <label
          htmlFor="passwordConfirm"
          className="absolute left-2.5 top-3 px-1 transition-all duration-300 bg-white text-pcolor font-medium 
          peer-focus:-translate-y-5 peer-focus:text-[#293BFF] peer-focus:text-xs 
          peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-pcolor peer-not-placeholder-shown:text-xs"
        >
          Parolni tasdiqlash
        </label>
      </div>

      {/* Register Button */}
      <button
        onClick={handleRegister}
        className="bg-bluenew text-white px-6 py-3 rounded-xl mt-4 w-full transition duration-300 cursor-pointer"
      >
        Ro'yxatdan o'tish
      </button>

      <div className="flex w-full items-center gap-4 my-8">
        <div className="bg-pcolor h-[1px] w-full"></div>
        <p className="text-pcolor text-[12px]">yoki</p>
        <div className="bg-pcolor h-[1px] w-full"></div>
      </div>
      <button className="flex gap-2.5 justify-center w-full py-3.5 text-bluenew font-semibold rounded-[10px] cursor-pointer shadow-xl bg-blue-50 transition duration-500">
        <img className="p-0.5 bg-white rounded-full" src={google} alt="google_icon" />
        google orqali kirish
      </button>

      <p className="text-black text-center mt-2 text-[13px] ">
              Ro'yxatdan o'tish orqali siz <span className="underline decoration-1">Foydalanuvchi shartlari</span> va <span className="underline decoration-1">Maxfiylik siyosatiga</span> <br /> rozilik bildirasiz.
            </p>

    </div>

  );
};

export default Register;
