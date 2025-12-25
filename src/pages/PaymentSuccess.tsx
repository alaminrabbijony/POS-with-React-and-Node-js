import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import useLoadOrderData from "../hooks/useOrderData.js";
import { use, useEffect, useState } from "react";
import { Navigate, replace, useLocation, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { getReceipt } from "../https/index.js";
import { useQuery } from "@tanstack/react-query";
import type { ReceiptTypes } from "../types/types.js";
import { formatBDDate } from "../const/index.js";
const PaymentSuccess = () => {
  //const [receipt, setReceipt] = useState<any>(null);
  //const [orderData, setorderData] = useState<any>(null);
  //const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClose, setClose] = useState<boolean>(false);

  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tranId = params.get("tran_id");

  /*  Fetch data

  if (!tranId) return <Navigate to="/payment/failure" replace />;

  useEffect(() => {
    const loadReciept = async () => {
      try {
        const res = await getReceipt(tranId);
        setReceipt(res.data?.receipt);
        setorderData(res.data?.order);
        //        setGateway()
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReciept();
  }, [tranId]);
*/

  // optimal fetching data

  const { data, isLoading, isError } = useQuery<{data: ReceiptTypes}>({
    queryKey: ["receipt", tranId],
    queryFn: () => getReceipt(tranId),
    enabled: !!tranId,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <ClipLoader color="#22c55e" />
      </div>
    );
  }

  if (isError || !data) {
    enqueueSnackbar("Something went wrong in the payment", {
      variant: "error",
    });
    return <Navigate to="/payment/failure" replace />;
  }

  const receipt = data.data.receipt;
  const orderData = data.data.order;
  const gateway = data.data.gateway;

  // Functions
  const handleModalClose = () => {
    if (isLoading) {
      setClose(true);
    }
    setClose(false);
    navigate("/");
  };
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
              <span className="text-gray-400">Transcation ID:</span>
              <span className="text-[#f5f5f5] font-medium">
                #{receipt?.transactionId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Payment Method:</span>
              <span className="text-[#f5f5f5]">{receipt.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date:</span>
              <span className="text-[#f5f5f5]">{formatBDDate(receipt.paidAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Table No:</span>
              <span className="text-[#f5f5f5]">{orderData.table?.tableNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Customer Name:</span>
              <span className="text-[#f5f5f5]">{orderData.customer?.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Phone:</span>
              <span className="text-[#f5f5f5]">
                +88{orderData.customer?.phone || "017xxxxxxx"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Guests:</span>
              <span className="text-[#f5f5f5]">
                {orderData.customer?.guests || "N/A"}
              </span>
            </div>

            <div className="border-t border-dashed border-[#2f2f2f] my-3" />

            <div className="flex justify-between text-base font-semibold">
              <span className="text-gray-300">Total Paid:</span>
              <span className="text-green-400">
                ৳ {orderData.bills.totalWithTax}
              </span>
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
