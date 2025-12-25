import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import type { OrderTypes } from "../../types/types.js";
import { formatBDDate, getAvatar } from "../../const/index.js";
import { getOrderStatusStyle, ORDER_STATUS_STYLES } from "../../util/style.js";


type orderProps = {
  order: OrderTypes
}

const OrderCard = ({order}: orderProps) => {

  const statusUI =getOrderStatusStyle(order.orderStatus)

   return (
    <div
      className="
        bg-[#1f1f1f] border border-[#2b2b2b] rounded-2xl
        p-5 w-full min-h-[170px]
        transition-all duration-200
        hover:border-[#3a3a3a] hover:bg-[#242424]
        hover:shadow-lg cursor-pointer
        flex flex-col justify-between
      "
    >
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#facc15] text-black font-semibold rounded-lg w-11 h-11 flex items-center justify-center">
            {getAvatar(order.customerDetails.name)}
          </div>

          <div>
            <h1 className="text-white font-semibold text-base leading-tight">
              {order.customerDetails.name}
            </h1>
            <p className="text-xs text-[#9a9a9a] mt-0.5">
              #{order._id.slice(-6)} • Dine In
            </p>
          </div>
        </div>

        {/* STATUS BADGE */}
        <span
  className={`
    flex items-center gap-1.5
    text-xs font-medium
    px-3 py-1 rounded-full
    ${statusUI.bg} ${statusUI.text}
  `}
>
  {statusUI.icon}
  {statusUI.label}
</span>
  {/* <span
  className={`
    flex items-center gap-1.5
    text-xs font-medium
    px-3 py-1 rounded-full
    "text-yellow-400"
  `}
>
  {order.orderStatus}
</span> */}
      </div>

      {/* MIDDLE */}
      <div className="flex items-center justify-between mt-4 text-sm text-[#b5b5b5]">
        <p>
         {formatBDDate(order.orderDate)}
        </p>
        <p>{order.items.length} items</p>
      </div>

      <hr className="border-[#2f2f2f] my-3" />

      {/* FOOTER */}
      <div className="flex items-end justify-between">
        <p className="text-xs uppercase tracking-widest text-[#8f8f8f]">
          Total
        </p>
        <p className="text-white text-2xl font-bold">
          ৳ {order.bills.totalWithTax}
        </p>
      </div>
    </div>
  )
};

export default OrderCard;
