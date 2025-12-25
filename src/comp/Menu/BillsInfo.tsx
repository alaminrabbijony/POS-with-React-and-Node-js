import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  addOrder,
  createSSLCommerzOrder,
  updateTable,
} from "../../https/index.js";
import { removeAllItems } from "../../store/redux/slices/cartSlice.js";
import { removeCustomerInfo } from "../../store/redux/slices/CustomerSlices.js";

const BillsInfo = () => {
  //React state
  const [paymentMethod, setPaymentMethod] = useState<string>();

  //Redux store data
  const cartData = useSelector((state: any) => state.cart);
  const cusData = useSelector((state: any) => state.customer);
  const dispatch = useSelector((state: any) => state.dispatch);

  // Var
  const tax = 0.045;
  const totalPriceWithTax = cartData.totalPrice + cartData.totalPrice * tax;

  const handlePlaceOrder = async () => {
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

    try {
      const orderRes = await addOrder(orderData); // order goes to DB
      //DB gives back order id
      const orderId = orderRes.data.data._id;

      //After successful order placement, clear the cart and customer data


      /* FOR ONLINE PAYMENT */

      if (paymentMethod === "online") {
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
      }
      enqueueSnackbar("Order placed successfully", { variant: "success" });
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Failed to place order";

      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return (
    <>
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
          onClick={() => setPaymentMethod("cash")}
          className={`${
            paymentMethod === "cash" ? "bg-[#383737]" : "bg-[#1f1f1f]"
          } px-4 py-3 w-full rounded-lg text-[#ababab] 
        font-semiboold`}
        >
          Cash
        </button>
        <button
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
          className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] 
        font-semiboold  text-lg"
          onClick={() => handlePlaceOrder()}
        >
          Place Order
        </button>
      </div>
    </>
  );
};

export default BillsInfo;
