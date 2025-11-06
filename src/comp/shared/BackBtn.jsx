import React from 'react'
import { IoArrowBack, IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const BackBtn = () => {
    const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="bg-[#fb6100] p-3 text-xl font-bold rounded-lg text-white">
      <IoArrowBackOutline />
    </button>
  )
}

export default BackBtn
