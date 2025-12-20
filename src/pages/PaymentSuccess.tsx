import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import useLoadOrderData from "../hooks/useOrderData.js";
import { use } from "react";
const PaymentSuccess = () => {
  // Redux Store
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");

  
  const { isLoading, data } = useLoadOrderData(orderId);
  if (isLoading) return <ClipLoader size={40} color="#facc15" />;
  // Functions
  const handleModalClose = () => {};
  const handlePrint = () => {};

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-[#0f0f0f] rounded-xl shadow-2xl w-[420px] overflow-hidden border border-[#1f1f1f]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f1f]">
          <h2 className="text-green-500 text-lg font-semibold flex items-center gap-2">
            ✓ Payment Successful
          </h2>
          <button
            onClick={handleModalClose}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Receipt */}
          <div className="bg-[#151515] rounded-lg p-4 space-y-2 text-sm text-gray-300 border border-[#262626]">
            <div className="flex justify-between">
              <span className="text-gray-400">Order ID</span>
              <span className="text-[#f5f5f5] font-medium">
                #ORD-{data?.orderId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Table</span>
              <span className="text-[#f5f5f5]">
                {data?.table?.tableNo || "N/A"} 
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Customer</span>
              <span className="text-[#f5f5f5]">
                {data?.customerDetails.name || "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Phone</span>
              <span className="text-[#f5f5f5]">
                {data?.customerDetails.phone || "017xxxxxxx"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Guests</span>
              <span className="text-[#f5f5f5]">
                {data?.customerDetails.guests || "N/A"} 
              </span>
            </div>

            <div className="border-t border-dashed border-[#2f2f2f] my-3" />

            <div className="flex justify-between text-base font-semibold">
              <span className="text-gray-300">Total Paid</span>
              <span className="text-green-400">৳ {data?.bills.totalWithTax}</span> 
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handlePrint}
              className="w-full py-3 rounded-lg bg-yellow-400 text-black font-bold text-lg hover:bg-yellow-300 transition"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
