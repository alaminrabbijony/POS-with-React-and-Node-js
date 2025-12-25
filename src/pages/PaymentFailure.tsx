import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getReceipt } from "../https/index.js";
import { ClipLoader } from "react-spinners";

const PaymentFailure = () => {
   const [receipt, setReceipt] = useState<any>(null);
    const [orderData, setorderData] = useState<any>(null);
    const [cusData, setCusData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

  // fetch
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const tranId = params.get("tran_id")

  useEffect(() => {
    const loadPayment = async () => {
      try {
        const res = await getReceipt(tranId)
        setReceipt(res.data?.receipt)
        setorderData(res.data?.order)
      } catch (error) {
        console.error(error)
      }finally{
        setIsLoading(false)
      }
    }

    loadPayment()

  }, [tranId])

  // Functions
  const handleModalClose = () => {};
  const handlePrint = () => {};

  
  if (isLoading) return <ClipLoader size={80} color="#facc15" className="" />;


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
          <h2 className="text-red-500 text-lg font-semibold flex items-center gap-2">
            ❌ Payment Failed
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
              <span className="text-gray-400">Transaction ID:</span>
              <span className="text-[#f5f5f5] font-medium">#TRAN-{receipt.transactionId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Customer Name:</span>
              <span className="text-[#f5f5f5]">{orderData.customer?.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Phone:</span>
              <span className="text-[#f5f5f5]">{orderData.customer?.phone}</span>
            </div>

            <div className="border-t border-dashed border-[#2f2f2f] my-3" />

            <div className="flex justify-between text-base font-semibold">
              <span className="text-red-300">Total Payable:</span>
              <span className="text-red-400">৳ {orderData.amount}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handlePrint}
              className="w-full py-3 rounded-lg bg-red-400 text-black font-bold text-lg hover:bg-yellow-300 transition"
            >
                Retry
            </button>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailure;
