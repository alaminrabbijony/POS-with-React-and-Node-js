import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { MdCoffeeMaker, MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/redux/store.js";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logOutUser } from "../../https/index.js";
import { removeUser } from "../../store/redux/slices/userSlice.js";

export default function Header() {
  const userData = useSelector((state: any) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const logoutMutatuion = useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      dispatch(removeUser());
      navigate("/auth");
    },
  });

  const handleLogout = () => {
    logoutMutatuion.mutate();
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-[#0d0d0d] text-white border-b border-[#1f1f1f]">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <MdCoffeeMaker size={40} />
        <h1 className="text-xl font-semibold tracking-wide text-[#f5f5f5]">
          Caffee
        </h1>
      </div>

      {/* Middle: Search Bar */}
      <div className="flex items-center gap-3 bg-[#1a1a1a] px-4 py-2 rounded-lg w-72">
        <FaSearch className="text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent w-full text-sm outline-none placeholder-gray-500 text-gray-200"
        />
      </div>

      {/* Right: User Section */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        {userData.role === "Admin" && (
          <button
            onClick={() => navigate("/dashboard")}
            className="
      relative
      p-2
      rounded-lg
      text-gray-400
      transition-all duration-200 ease-out
      hover:text-white
      hover:bg-white/5
      hover:scale-105
      focus:outline-none focus:ring-2 focus:ring-green-500/40
      group
    "
            aria-label="Admin Dashboard"
          >
            {/* Icon */}
            <MdDashboard className="text-xl" />

            {/* Notification Dot */}
            <span
              className="
        absolute -top-0.5 -right-0.5
        w-2 h-2 rounded-full bg-red-500
        ring-2 ring-[#0f0f0f]
      "
            />

            {/* Tooltip */}
            <span
              className="
        pointer-events-none
        absolute left-1/2 -bottom-9
        -translate-x-1/2
        whitespace-nowrap
        rounded-md bg-black/90 px-2 py-1
        text-xs text-gray-200
        opacity-0 scale-95
        transition-all duration-200
        group-hover:opacity-100 group-hover:scale-100
      "
            >
              Dashboard
            </span>
          </button>
        )}
        <button className="relative hover:text-gray-300 transition">
          <FaBell className="text-xl" />
          <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-3xl text-gray-400" />
          <div className="leading-tight">
            <h1 className="text-sm font-medium">{userData.name}</h1>
            <p className="text-xs text-gray-500">{userData.role}</p>
          </div>
          <IoLogInOutline
            onClick={handleLogout}
            className="text-red-500 mt-2"
            size={40}
          />
        </div>
      </div>
    </header>
  );
}
