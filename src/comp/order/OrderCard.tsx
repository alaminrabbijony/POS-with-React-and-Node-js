import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const OrderCard = () => {
  return (
    <div className="bg-[#262626] border border-[#2f2f2f] rounded-xl p-6 w-full min-h-[180px] hover:bg-[#2e2e2e] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-500 text-black font-bold text-base rounded-md w-12 h-12 flex items-center justify-center">
            AM
          </div>
          <div>
            <h1 className="text-[#f5f5f5] font-semibold text-lg leading-tight">
              Amrit Raj
            </h1>
            <p className="text-[#999] text-sm">#101 / Dine in</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-green-500 flex items-center gap-2 text-sm font-medium">
            <FaCheckCircle /> Ready
          </p>
          <p className="text-[#888] text-xs flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-600"></span>
            Ready to serve
          </p>
        </div>
      </div>

      {/* Footer */}
      <div>
        <div className="flex items-center justify-between text-[#ababab] text-sm mt-4">
          <p>January 18, 2025 • 08:32 PM</p>
          <p>8 Items</p>
        </div>

        <hr className="border-[#3a3a3a] my-3" />

        <div className="flex items-center justify-between">
          <p className="text-[#ababab] text-xs uppercase tracking-wider">
            Total
          </p>
          <p className="text-white text-2xl font-bold">₹250.00</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
