import React, { use } from 'react';
import { FaHome } from "react-icons/fa";
import { MdOutlineBorderColor, MdTableBar, MdMoreHoriz } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import { useNavigate, useNavigation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate()
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 flex justify-around items-center py-2 border-t border-[#1f1f1f] text-white">
        <button onClick={()=> navigate('/')} className="flex items-center justify-center text-[#ababab] bg-[#343434] w-[200px]">
          <FaHome className="inline mr-4" size={15} />Home
        </button>
        <button onClick={()=> navigate('/order')} className="flex items-center justify-center text-[#ababab] w-[200px]">
          <MdOutlineBorderColor className="inline mr-4" size={15} />Orders
        </button>
        <button onClick={()=> navigate('/')} className="flex items-center justify-center text-[#ababab] w-[200px]">
          <MdTableBar className="inline mr-4" size={15} />Tables
        </button>
        <button className="flex items-center justify-center text-[#ababab] w-[200px]">
          <MdMoreHoriz className="inline mr-4" size={15} />More
        </button>
        <button className="absolute bottom-3 bg-[#F6B100] text-[#f5f5f5] rounded-full p-4 items-center">
          <BiSolidDish />
        </button>
    </div>
  );
}
