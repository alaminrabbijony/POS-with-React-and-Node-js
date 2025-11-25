import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineBorderColor, MdTableBar, MdMoreHoriz } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal.js";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/redux/store.js";
import { setCustomerInfo } from "../../store/redux/slices/CustomerSlices.js";

export default function BottomNav() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [guestCount, setGuestCount] = useState<number>(0);
  const location = useLocation();
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const isActive = (path: string) => location.pathname === path;

  const decrement = () => {
    if (guestCount <= 0) return;
    setGuestCount((prev) => prev - 1);
  };

  const increment = () => {
    if (guestCount >= 6) return;
    setGuestCount((prev) => prev + 1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleCreateOrder = () => {
    // send data to rdeux store
    dispatch(setCustomerInfo({ name, phone, guest: guestCount }));
    navigate("/tables");
    closeModal();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 flex justify-around items-center py-2 border-t border-[#1f1f1f] text-white">
      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className={`flex items-center justify-center font-bold 
          ${
            isActive("/") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"
          } w-[300px] rounded-20px`}
      >
        <FaHome className="inline mr-4" size={15} />
        Home
      </button>

      {/* Orders Button */}
      <button
        onClick={() => navigate("/order")}
        className={`flex items-center justify-center font-bold 
          ${
            isActive("/order")
              ? "text-[#f5f5f5] bg-[#343434]"
              : "text-[#ababab]"
          } w-[300px] rounded-20px`}
      >
        <MdOutlineBorderColor className="inline mr-4" size={15} />
        Orders
      </button>

      {/* Tables Button */}
      <button
        onClick={() => navigate("/tables")}
        className={`flex items-center justify-center font-bold 
          ${
            isActive("/tables")
              ? "text-[#f5f5f5] bg-[#343434]"
              : "text-[#ababab]"
          } w-[300px] rounded-20px`}
      >
        <MdTableBar className="inline mr-4" size={15} />
        Tables
      </button>

      {/* More Button */}
      <button className="flex items-center justify-center text-[#ababab] w-[200px]">
        <MdMoreHoriz className="inline mr-4" size={15} />
        More
      </button>

      {/* Floating Add Order Button */}
      <button
        onClick={openModal}
        className="absolute bottom-3 bg-[#F6B100] text-[#f5f5f5] rounded-full p-4"
      >
        <BiSolidDish />
      </button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">
        {/* Customer Name */}
        <div>
          <label className="block text-[#ababab] mb-3 text-sm font-medium">
            Customer Name
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              value={name}
              onChange={(e) =>  setName(e.target.value)}
              placeholder="Enter Customer Name"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Customer Phone */}
        <div>
          <label className="block text-[#ababab] mb-5 text-sm font-medium">
            Customer Phone Number
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input
              type="number"
              value={phone}
              onChange={(e) =>  setPhone(e.target.value)}
              placeholder="+8801XXXXXXXXX"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Guest Count */}
        <div className="block mb-2 mt-3 text-sm font-medium text-[#ababab]">
          <label className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
            Guest
          </label>

          <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg mt-2">
            <button onClick={decrement} className="text-yellow-500 text-2xl">
              &minus;
            </button>

            <span className="text-white">{guestCount} Person</span>

            <button onClick={increment} className="text-yellow-500 text-2xl">
              &#43;
            </button>
          </div>
        </div>

        {/* Create Order Button */}
        <button
          className="w-full bg-[#F6B100] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-yellow-700"
          onClick={() => {
            handleCreateOrder();
          }}
        >
          Create Order
        </button>
      </Modal>
    </div>
  );
}
