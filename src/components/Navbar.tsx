import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../../public/logo.png";
import "../lib/css/Font.css";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import tokenService from "@/services/token.service";
import toast from "react-hot-toast";
import { logoutUser } from "@/services/AuthWebsiteService/AuthWebService";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ Check login state from token
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!tokenService.getLocalAccessToken()
  );

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "OUR YACHTS", path: "/404" },
    { name: "DESTINATIONS", path: "/404" },
  ];

  // ✅ Logout mutation
  const { mutate: handleLogout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: (response) => {
      tokenService.clearStorage();
      queryClient.clear();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.dispatchEvent(new Event("storage"));

      toast.success(response?.message || "You have been logged out successfully!", {
        position: "top-center",
      });

      setIsLoggedIn(false);
      navigate("/login");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to logout. Please try again.",
        { position: "top-center", duration: 2000 }
      );
    },
    retry: 0,
  });

  // ✅ Handle login/dashboard button
  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  // ✅ Update login state when token changes
  useEffect(() => {
    const updateLoginState = () => {
      setIsLoggedIn(!!tokenService.getLocalAccessToken());
    };

    window.addEventListener("storage", updateLoginState);
    return () => window.removeEventListener("storage", updateLoginState);
  }, []);

  return (
    <nav className="flex justify-between items-center px-18 py-4 bg-white border-b border-gray-200 relative">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-47 h-16 object-contain" />
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center gap-15">
        <ul className="flex gap-10 text-[13px] tracking-wider text-black">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-[#BFA888] text-[15px] tracking-widest transition-all duration-200 inconsolata"
            >
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>

        <button
          onClick={handleButtonClick}
          disabled={isPending}
          className="bg-[#BFA888] text-white px-8 py-4 text-[13px] tracking-wider hover:opacity-90 transition-all"
        >
          {isPending
            ? "Please wait..."
            : isLoggedIn
            ? "DASHBOARD"
            : "LOGIN"}
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <div
        className="md:hidden text-3xl text-gray-700 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX /> : <HiMenu />}
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg w-full flex flex-col items-center gap-6 py-6 md:hidden z-50">
          <ul className="flex flex-col items-center gap-4 text-sm tracking-wider text-black">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="cursor-pointer hover:text-[#BFA888] transition-all inconsolata"
                onClick={() => setIsOpen(false)}
              >
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>

          <button
            onClick={handleButtonClick}
            disabled={isPending}
            className="bg-[#BFA888] text-white px-8 py-4 text-[13px] tracking-wider hover:opacity-90 transition-all"
          >
            {isPending
              ? "Please wait..."
              : isLoggedIn
              ? "DASHBOARD"
              : "LOGIN"}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
