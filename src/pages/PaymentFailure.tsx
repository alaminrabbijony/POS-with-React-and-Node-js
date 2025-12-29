import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderById, getReceipt } from "../https/index.js";
import { ClipLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import CustomeLoader from "../comp/shared/CustomeLoading.js";
import { enqueueSnackbar } from "notistack";
import { formatBDDate } from "../const/index.js";
import Modal from "../comp/shared/Modal.js";

const PaymentFailure = () => {
  // fetch
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  // useEffect(() => {
  //   const loadPayment = async () => {
  //     try {
  //       const res = await getReceipt(orderId)
  //       setReceipt(res.data?.receipt)
  //       setorderData(res.data?.order)
  //     } catch (error) {
  //       console.error(error)
  //     }finally{
  //       setIsLoading(false)
  //     }
  //   }

  //   loadPayment()

  // }, [orderId])

  const {
    data: orderData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: async () => {
      const res = await getOrderById(orderId!);
      return res.data.data;
    },
    enabled: !!orderId,
  });

  // Functions

  const handleClose = () => {
    setIsOpen(false);
    return navigate("/");
  };
  const handleRetry = () => {};

  if (!orderData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <p className="text-gray-400">Order failed</p>
      </div>
    );
  }

  if (isError) {
    enqueueSnackbar("Something went wrong while fetching order", {
      variant: "error",
    });
  }

  if (isLoading) {
    return <CustomeLoader message="Order loading...." />;
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Payment">
      <div className="space-y-6">
        {/* Success Banner */}
        <div className="flex items-center justify-center gap-2 text-red-400 font-semibold text-sm">
          <span className="text-lg"> Failed</span>
          <span className="text-lg">❌</span>
        </div>

        {/* Receipt Card */}
        <div className="bg-[#111] rounded-lg border border-[#2a2a2a] p-5 text-sm">
          {/* Meta */}
          <div className="space-y-2 text-[#cfcfcf]">
            <div className="flex justify-between">
              <span className="text-[#8f8f8f]">Order ID</span>
              <span className="font-mono text-xs text-white">#{orderId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#8f8f8f]">Date</span>
              <span>{formatBDDate(orderData.orderDate)}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-[#333] my-4" />

          {/* Order Info */}
          <div className="space-y-2 text-[#cfcfcf]">
            <div className="flex justify-between">
              <span className="text-[#8f8f8f]">Table</span>
              <span>{orderData.table?.tableNo}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#8f8f8f]">Customer</span>
              <span>{orderData.customerDetails?.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#8f8f8f]">Phone</span>
              <span>+88{orderData.customerDetails?.phone}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#8f8f8f]">Guests</span>
              <span>{orderData.customerDetails?.guests}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-[#333] my-4" />

          {/* Total */}
          <div className="flex justify-between items-center text-base font-semibold">
            <span className="text-[#e5e5e5]">Total Payable</span>
            <span className="text-red-400 text-lg">
              ৳{orderData.bills?.totalWithTax}
            </span>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={handleRetry}
          className="w-full py-3 rounded-lg bg-[#f6b100] 
                        text-black font-bold text-base 
                        hover:bg-yellow-400 transition"
        >
          Retry
        </button>
      </div>
    </Modal>
  );
};

export default PaymentFailure;
/**
 * {orderData.customerDetails?.name}
 * #ORD-{orderId}
 *  {orderData.customerDetails?.phone}
 * {formatBDDate(orderData.orderDate)}
 * ৳ {orderData.bills?.totalWithTax}
 */
