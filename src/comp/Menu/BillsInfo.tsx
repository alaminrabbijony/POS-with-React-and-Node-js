import {
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrder,
  cashPayment,
  createSSLCommerzOrder,
  updateTable,
} from "../../https/index.js";
import { removeAllItems } from "../../store/redux/slices/cartSlice.js";
import { removeCustomerInfo } from "../../store/redux/slices/CustomerSlices.js";
import { Navigate, useNavigate } from "react-router-dom";
import CashReceipt from "../Receipt/CashReceipt.js";

const BillsInfo = () => {
  //React state
  const [paymentMethod, setPaymentMethod] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [receiptOrderId, setReceiptOrderId] = useState<string>();

  //Redux store data
  const cartData = useSelector((state: any) => state.cart);
  const cusData = useSelector((state: any) => state.customer);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Var
  const tax = 0.045;
  const totalPriceWithTax = cartData.totalPrice + cartData.totalPrice * tax;

  //orderMutation
  const createOrderMutation = useMutation({
    mutationFn: addOrder,
    onError: (err: any) => {
      const msg = err.response?.data?.message;
      enqueueSnackbar(msg || "Order placement failed", { variant: "error" });
    },
  });
  //cahs payment Mutation
  const cashPaymentMutation = useMutation({
    mutationFn: ({ orderId }: { orderId: string }) => cashPayment({ orderId }),
    onSuccess: (_data, variables) => {
      enqueueSnackbar("Order Completed", { variant: "success" });
      dispatch(removeAllItems());
      dispatch(removeCustomerInfo());
      //  invalidate queries
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      //Open Modal of receipt
      setReceiptOrderId(variables.orderId);
      setIsModalOpen(true);
    },
    onError(error: any) {
      const message = error.response?.data?.message || "Cash payment failed";
      enqueueSnackbar(message, { variant: "error" });
    },
  });

  /* FOR ONLINE PAYMENT */
  const handleOnlinePayment = async (orderId: string) => {
    try {
      const { data } = await createSSLCommerzOrder({ orderId });

      if (!data?.redirectUrl) {
        throw new Error("No redirect URL");
      }

      /*            IMPORTANT 
        SAVE IMPORTANT DATA BEFORE REDIRECTING
        orderID, payment Id in local storage
        */

      localStorage.setItem("paymentId", data.paymentId);
      localStorage.setItem("orderId", orderId);

      window.location.href = data.redirectUrl;
      return;
    } catch (error: any) {
      const msg = error.response?.data?.message;
      enqueueSnackbar(msg || "Online payment failed", { variant: "error" });
    }
  };

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      enqueueSnackbar("Select a payment method", { variant: "warning" });
      return;
    }
    // Proceed with placing the order

    const orderData = {
      // it should match backend order schema
      customerDetails: {
        name: cusData.customerName, // comming from redux store
        phone: cusData.customerPhone,
        guests: cusData.guest,
      },
      bills: {
        total: cartData.totalPrice,
        tax: parseFloat((cartData.totalPrice * tax).toFixed(2)),
        totalWithTax: parseFloat(totalPriceWithTax.toFixed(2)),
      },
      items: cartData.items,
      table: cusData.table.tableId,
    };

    //place the order with createMutation
    createOrderMutation.mutate(orderData, {
      onSuccess: (res: any) => {
        const orderId = res.data.data._id;

        if (!orderId) {
          enqueueSnackbar("Invalid order response", { variant: "error" });
          return;
        }

        if (paymentMethod === "cash") {
          cashPaymentMutation.mutate({ orderId });
          return;
        }
        if (paymentMethod === "online") {
          handleOnlinePayment(orderId);
        }
      },
    });
  };

  //Lock for multi station

  const isProcessing =
    createOrderMutation.isPending || cashPaymentMutation.isPending;

  return (
    <>
      {isModalOpen && receiptOrderId && (
        <CashReceipt
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          orderId={receiptOrderId}
        />
      )}

      <div className="flex items-center justify-between px-5 mt-2">
        <p
          className="text-xs text-[#ababab]
        
        font-medium mt-2"
        >
          Items ({cartData.quantity})
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ${cartData.totalPrice}
        </h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Tax (4.5%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ${totalPriceWithTax}
        </h1>
      </div>
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          disabled={isProcessing}
          onClick={() => setPaymentMethod("cash")}
          className={`${
            paymentMethod === "cash" ? "bg-[#383737]" : "bg-[#1f1f1f]"
          } px-4 py-3 w-full rounded-lg text-[#ababab] 
        font-semiboold`}
        >
          Cash
        </button>
        <button
          disabled={isProcessing}
          onClick={() => setPaymentMethod("online")}
          className={`${
            paymentMethod === "online" ? "bg-[#383737]" : "bg-[#1f1f1f]"
          } px-4 py-3 w-full rounded-lg text-[#ababab] 
        font-semiboold`}
        >
          Online
        </button>
      </div>
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] 
        font-semiboold text-lg"
        >
          Print Receipt
        </button>
        <button
          disabled={isProcessing}
          className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] 
        font-semiboold  text-lg"
          onClick={() => handlePlaceOrder()}
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </button>
      </div>
    </>
  );
};

export default BillsInfo;
