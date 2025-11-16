import React from "react";
import BackBtn from "../comp/shared/BackBtn";
import { FaUserCircle } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";
import MenuContainer from "../comp/Menu/MenuContainer";

const Menu = () => {
  return (
       <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] flex flex-row">
      {/* Left Section */}
      <div className="flex-[8] border-r border-gray-700">
        <div className="flex items-center justify-between px-10 py-4 mt-2">
          <div className="flex items-center gap-4">
            <BackBtn />
            <h1 className="text-[#f5f5f5] text-2xl font-bold">Menu</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <IoRestaurantOutline  className="text-3xl text-gray-400" />
              <div className="leading-tight">
                <h1 className="text-[#f5f5f5] text-sm font-bold">Customer Name</h1>
                 <p className="text-xs text-gray-500">Table 01</p>
              </div>
            </div>
          </div>
        </div>
        <MenuContainer />
      </div>

      {/* Right Section */}
      <div className="flex-[2] bg-[#1f1]"></div>
    </section>
  );
};

export default Menu;
