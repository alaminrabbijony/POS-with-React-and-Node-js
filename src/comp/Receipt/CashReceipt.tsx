import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { formatBDDate } from "../../const/index.js";
import Modal from "../shared/Modal.js";

import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { ReceiptTypes } from "../../types/types.js";
import { getReceipt } from "../../https/index.js";
import { enqueueSnackbar } from "notistack";
import CustomeLoader from "../shared/CustomeLoading.js";

type CashReceiptProps = {
  isModalOpen: boolean;
  orderId: string;
  onClose: () => void;
};

const CashReceipt = ({ isModalOpen, orderId, onClose }: CashReceiptProps) => {
  const { data, isLoading, isError } = useQuery<{ data: ReceiptTypes }>({
    queryKey: ["receipt", orderId],
    queryFn: () => getReceipt(orderId),
    retry: 1,
  });

 useEffect(() => {
  if (isError) {
    enqueueSnackbar("Failed to load receipt", { variant: "error" });
    onClose();
  }
}, [isError, onClose]);

  if (!orderId) return null;

if (isLoading) {
  return <CustomeLoader message="Receipt Loading" />;
}

if (!data?.data?.receipt) {
  return null;
}

  const receipt = data.data.receipt;
  const orderData = data.data.order;
  const gateway = data.data.gateway;

  const handlePrint = () => {};

  return (
    <Modal isOpen={isModalOpen} onClose={onClose} title="Receipt">
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

export default CashReceipt;
