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
import CustomeLoader from "../comp/shared/CustomeLoading.js";
import Modal from "../comp/shared/Modal.js";
const PaymentSuccess = () => {
  //const [receipt, setReceipt] = useState<any>(null);
  //const [orderData, setorderData] = useState<any>(null);
  //const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClose, setClose] = useState<boolean>(false);

  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");

  /*  Fetch data

  if (!orderId) return <Navigate to="/payment/failure" replace />;

  useEffect(() => {
    const loadReciept = async () => {
      try {
        const res = await getReceipt(orderId);
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
  }, [orderId]);
*/

  // optimal fetching data

  const { data, isLoading, isError } = useQuery<{ data: ReceiptTypes }>({
    queryKey: ["receipt", orderId],
    queryFn: () => getReceipt(orderId),
    enabled: !!orderId,
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Something went wrong in the payment", {
        variant: "error",
      });
    }
  }, []);

  if (!orderId) {
    return <Navigate to="/payment/failure" replace />;
  }

  if (isLoading) {
    return (
      <CustomeLoader message="Receipt Loading" />
    );
  }
  if (!data?.data?.receipt) {
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
   <Modal isOpen={!isClose} onClose={handleModalClose} title="Receipt">
         <div className="space-y-6">
   
       {/* Success Banner */}
       <div className="flex items-center justify-center gap-2 text-green-400 font-semibold text-sm">
         <span className="text-lg">✓</span>
         <span>Payment Successful</span>
       </div>
   
       {/* Receipt Card */}
       <div className="bg-[#111] rounded-lg border border-[#2a2a2a] p-5 text-sm">
   
         {/* Meta */}
         <div className="space-y-2 text-[#cfcfcf]">
           <div className="flex justify-between">
             <span className="text-[#8f8f8f]">Transaction ID</span>
             <span className="font-mono text-xs text-white">
               #{receipt.transactionId}
             </span>
           </div>
   
           <div className="flex justify-between">
             <span className="text-[#8f8f8f]">Payment Method</span>
             <span className="uppercase tracking-wide">
               {receipt.method}
             </span>
           </div>
   
           <div className="flex justify-between">
             <span className="text-[#8f8f8f]">Date</span>
             <span>{formatBDDate(receipt.paidAt)}</span>
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
             <span>{orderData.customer?.name}</span>
           </div>
   
           <div className="flex justify-between">
             <span className="text-[#8f8f8f]">Phone</span>
             <span>+88{orderData.customer?.phone}</span>
           </div>
   
           <div className="flex justify-between">
             <span className="text-[#8f8f8f]">Guests</span>
             <span>{orderData.customer?.guests}</span>
           </div>
         </div>
   
         <div className="border-t border-dashed border-[#333] my-4" />
   
         {/* Total */}
         <div className="flex justify-between items-center text-base font-semibold">
           <span className="text-[#e5e5e5]">Total Paid</span>
           <span className="text-green-400 text-lg">
             ৳ {orderData.bills.totalWithTax}
           </span>
         </div>
       </div>
   
       {/* Actions */}
       <button
         onClick={handlePrint}
         className="w-full py-3 rounded-lg bg-[#f6b100] 
                    text-black font-bold text-base 
                    hover:bg-yellow-400 transition"
       >
         Print Receipt
       </button>
     </div>
       </Modal>
  );
};

export default PaymentSuccess;
