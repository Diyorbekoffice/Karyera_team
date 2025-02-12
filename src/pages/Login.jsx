import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import aye from "../assets/aye_icon.svg";
import ayeOf from "../assets/ayeOf_icon.svg";
import google from "../assets/google.svg";
import logo from "../assets/logo.svg";
import leftArrow from "../assets/left_arrow.svg";
import Register from "./Register"; // Register komponentini import qilamiz
import Respass from "./Respass"; // Respass komponentini import qilamiz


const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Register modalini boshqarish uchun state
  const [isRespassModalOpen, setIsRespassModalOpen] = useState(false); // Respass modalini boshqarish uchun state
  const navigate = useNavigate();

  const handleLogin = async () => {
    const username = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      console.error("Iltimos, email va parolni kiriting!");
      return;
    }

    console.log("Yuborilgan ma'lumotlar:", { username, password });

    try {
      const response = await axios.post("/user/login/", { username, password });

      if (response.data.access && response.data.refresh) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        console.log("Tokenlar saqlandi.");
        navigate("/");  // Bosh sahifaga yo'naltirish
      } else {
        console.error("Tokenlar topilmadi.");
      }
    } catch (error) {
      console.error("Xatolik:", error.response ? error.response.data : error.message);
    }
  };

  const openRespassModal = () => {
    setIsRespassModalOpen(true); // Respass modalini ochish
  };

  const closeRespassModal = () => {
    setIsRespassModalOpen(false); // Respass modalini yopish
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true); // Register modalini ochish
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false); // Register modalini yopish
  };

  return (
    <div className="">
      <img className="ml-15 mt-5" src={logo} alt="logo" />
      <div className="flex justify-center items-center gap-12">
        <div className="w-1/2 flex flex-col text-left gap-40">
          <div className="flex flex-col g-7">
            <h2 className="text-6xl font-bold text-blacknew mb-3.5">Xush kelibsiz!</h2>
            <p>Hisobingizga kiring yoki yangi hisob yarating.</p>
          </div>
          <div>
            <button
              onClick={openRegisterModal}  // Register modalini ochish
              className="px-5 py-3 text-white font-semibold bg-bluenew rounded-3xl">
              Ro'yhatdan o'tish
            </button>

            <p className="text-black mt-10">
              Ro'yxatdan o'tish orqali siz <span className="underline decoration-1">Foydalanuvchi shartlari</span> va <span className="underline decoration-1">Maxfiylik siyosatiga</span> rozilik bildirasiz.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-5 w-[360px] sm:w-[530px] sm:p-10 ">
          <div className="">
            <h2 className="text-2xl font-bold text-blacknew mb-3.5 text-center">Kirish</h2>
            <button className="flex gap-2.5 justify-center w-full mt-6 py-3.5 bg-bluenew text-white font-semibold rounded-[10px] cursor-pointer  transition duration-500">
              <img className="p-0.5 bg-white rounded-full" src={google} alt="google_icon" />
              google orqali kirish
            </button>
            <div className="flex w-full items-center gap-4 my-8">
              <div className="bg-pcolor h-[1px] w-full"></div>
              <p className="text-pcolor text-[12px]">yoki</p>
              <div className="bg-pcolor h-[1px] w-full"></div>
            </div>
          </div>

          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-1 relative">
              <input
                ref={emailRef}
                id="email"
                type="email"
                placeholder=" "
                className="resInput peer py-3 px-2.5 rounded-xl border text-pcolor focus:outline-bluenew focus:text-blacknew w-full"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-3 px-1 transition-all duration-300 bg-white text-pcolor font-medium 
                peer-focus:-translate-y-5 peer-focus:text-[#293BFF] peer-focus:text-xs 
                peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-pcolor peer-not-placeholder-shown:text-xs"
              >
                Email
              </label>
            </div>

            <div className="flex flex-col gap-1 relative">
              <input
                ref={passwordRef}
                id="pass"
                type={showPassword ? "text" : "password"}
                placeholder=" "
                className=" peer py-3 px-2.5 rounded-xl border text-pcolor focus:outline-bluenew focus:text-blacknew w-full"
              />
              <label
                htmlFor="pass"
                className="absolute left-3 top-3 px-1 transition-all duration-300 bg-white text-pcolor font-medium 
                peer-focus:-translate-y-5 peer-focus:text-[#293BFF] peer-focus:text-xs 
                peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-pcolor peer-not-placeholder-shown:text-xs"
              >
                Parol
              </label>
              <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 cursor-pointer text-xl">
                {showPassword ? (<img src={aye} alt="Show" className="w-6 h-6" />) : (<img src={ayeOf} alt="Hide" className="w-6 h-6" />)}
              </span>
            </div>

            <p className="cursor-pointer text-blue-500" onClick={openRespassModal}>Parolingizni unutdingizmi?</p>
            <button onClick={handleLogin} className="bg-bluenew py-3 px-2.5 rounded-xl text-white font-semibold cursor-pointer border border-none duration-500">
              Kirish
            </button>
            <p className="flex justify-center gap-2 text-pcolor">Hisobingiz yo'qmi? <span className="text-bluenew cursor-pointer" onClick={openRegisterModal}>Ro'yhatdan o'tish</span></p>
          </div>
        </div>
      </div>

      {/* Register Modal oyna */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center p-12" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] h-[90%] relative"> {/* Kichikroq modal oyna */}
            <Register />
            <img
              src={leftArrow}
              alt="Close"
              onClick={closeRegisterModal}
              className="absolute left-3 top-3 cursor-pointer w-5 h-5"
            />
          </div>
        </div>
      )}

      {/* Respass Modal oyna */}
      {isRespassModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
          <div className="bg-white  rounded-lg w-[90%] max-w-[400px] h-[50%] relative"> {/* Kichikroq modal oyna */}
            <Respass />
            <img
              src={leftArrow}
              alt="Close"
              onClick={closeRespassModal}
              className="absolute left-3 top-3 cursor-pointer w-5 h-5"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default Login;
