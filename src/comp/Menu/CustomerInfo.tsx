import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate, getAvatar } from "../../const/index.js";

const CustomerInfo = () => {
  const [date, setDate] = useState<Date>(new Date());
  const customerData = useSelector((state: any) => state.customer);
  
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex flex-col items-start">
        <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
          {customerData.customerName || "Customer Name"}
        </h1>
        <p className="text-xs text-[#ababab] font-medium mt-1">
          {" "}
          {customerData.orderId || "none"} / Dine in
        </p>
        <p className="text-xs text-[#ababab] font-medium mt-2">
          {formatDate(date)}
        </p>
      </div>
      <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
        {getAvatar(customerData.customerName || "N/A")}
      </button>
    </div>
  );
};

export default CustomerInfo;
