import React, { use, useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineBorderColor, MdTableBar, MdMoreHoriz } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import { useNavigate, useNavigation } from "react-router-dom";
import Modal from "./MOdal";

export default function BottomNav() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount]= useState(0);


  const decremeant = () => {
    if (guestCount <= 0) return;
    setGuestCount((prev) => prev - 1);
  }
  const incrementCount = () => {
    if (guestCount >= 6) return;
    setGuestCount((prev) => prev + 1)
  }
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 flex justify-around items-center py-2 border-t border-[#1f1f1f] text-white">
      <button
        onClick={() => navigate("/")}
        className="flex items-center justify-center text-[#ababab] bg-[#343434] w-[200px]"
      >
        <FaHome className="inline mr-4" size={15} />
        Home
      </button>
      <button
        onClick={() => navigate("/order")}
        className="flex items-center justify-center text-[#ababab] w-[200px]"
      >
        <MdOutlineBorderColor className="inline mr-4" size={15} />
        Orders
      </button>
      <button
        onClick={() => navigate("/tables")}
        className="flex items-center justify-center text-[#ababab] w-[200px]"
      >
        <MdTableBar className="inline mr-4" size={15} />
        Tables
      </button>
      <button className="flex items-center justify-center text-[#ababab] w-[200px]">
        <MdMoreHoriz className="inline mr-4" size={15} />
        More
      </button>
      <button
        onClick={openModal}
        className="absolute bottom-3 bg-[#F6B100] text-[#f5f5f5] rounded-full p-4 items-center"
      >
        <BiSolidDish />
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">
        <div>
          <label className="block text-[#ababab] mb-3 text-sm font-medium">
            Customer Name
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name=""
              placeholder="Enter Customer name"
              id=""
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
          
        </div>
         <div>
          <label className="block text-[#ababab] mb-5 text-sm font-medium">
            Customer Phone Number
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input
              type="number"
              name=""
              placeholder="+8801XXXXXXXXX"
              id=""
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
          
        </div>
        <div className="block mb-2 mt-3 text-sm font-medium text=[#ababab]">
          <label className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
            Guest
          </label>
          <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
            <button onClick={decremeant} className="text-yellow-500 text-2xl">&minus;</button>
            <span className="text-white">{guestCount} Person</span>
            <button onClick={incrementCount} className="text-yellow-500 text-2xl">&#43;</button>
          </div>
        </div>
        <button
          className="w-full bg-[#F6B100] text-[#f5f5f5] rounded-lg py-3 mt-8 
        hover:bg-yellow-700
        "
        onClick={() => {
          navigate('/tables')
          closeModal();
        }}
        >
          Create Order
        </button>
      </Modal>
    </div>
  );
}
