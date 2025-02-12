import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      navigate("/login"); 
    }
  }, [navigate]);

  // Chiqish funksiyasi
  const handleLogout = () => {
    localStorage.removeItem("accessToken");  // accessToken ni o'chirish
    localStorage.removeItem("refreshToken");  // refreshToken ni o'chirish
    navigate("/login");  // Login sahifasiga yo'naltirish
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Bosh sahifa</h1>
      <p>Xush kelibsiz!</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Chiqish
      </button>
    </div>
  );
};

export default Home;
