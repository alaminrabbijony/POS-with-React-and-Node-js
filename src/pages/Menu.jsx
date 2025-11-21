import React from "react";
import BackBtn from "../comp/shared/BackBtn";
import { FaNotesMedical, FaUserCircle } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";
import MenuContainer from "../comp/Menu/MenuContainer";
import { RiDeleteBin2Fill } from "react-icons/ri";
import CustomerInfo from "../comp/Menu/CustomerInfo";
import CartInfo from "../comp/Menu/CartInfo";
import BillsInfo from "../comp/Menu/BillsInfo";

const Menu = () => {
  return (
       <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] flex flex-row">
      {/* Left Section */}
      <div className="flex-[7] border-r border-gray-700">
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
      <div className="flex-[3] bg-[#1a1a1a] mt-4 mr-3 h-[780px] rounded-lg pt-2">
        {/* Customer Info */}
        <CustomerInfo />
        <hr className="border-[#2a2a2a] border-t-2" />
        {/* cart Item */}
       <CartInfo />
        {/* Bills */}
        <BillsInfo/>
      </div>
    </section>
  );
};

export default Menu;
