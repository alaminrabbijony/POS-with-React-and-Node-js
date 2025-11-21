import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { MdCoffeeMaker } from "react-icons/md";

export default function Header() {
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
        <button className="relative hover:text-gray-300 transition">
          <FaBell className="text-xl" />
          <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-3xl text-gray-400" />
          <div className="leading-tight">
            <h1 className="text-sm font-medium">ARJ</h1>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
      
    </header>
  );
}
