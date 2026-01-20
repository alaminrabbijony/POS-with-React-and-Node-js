import { FaCheckDouble, FaCircle } from "react-icons/fa"
import { getOrderStatusStyle } from "../../util/style.js"
import { getAvatar } from "../../const/index.js"
import type { OrderTypes } from "../../types/types.js"

type OrderProps = {
  order: OrderTypes
}

export default function OrderList({ order }: OrderProps) {
  const statusUI = getOrderStatusStyle(order.orderStatus)

  return (
    <div
      className="
        grid grid-cols-[1.5fr_1fr_1.5fr]
        items-center
        bg-[#1f1f1f]
        border border-[#2a2a2a]
        rounded-xl
        px-4 py-3
        hover:bg-[#242424]
        transition
      "
    >
      {/* ================= LEFT: CUSTOMER ================= */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-yellow-400 text-black font-bold flex items-center justify-center">
          {getAvatar(order.customerDetails.name)}
        </div>

        <div>
          <p className="text-[#f5f5f5] font-semibold leading-tight">
            {order.customerDetails.name}
          </p>

          <div className="flex items-center gap-2 text-xs text-[#ababab] mt-0.5">
            <span>{order.items.length} items</span>
            <span className="text-[#555]">•</span>
          </div>
        </div>
      </div>

      {/* ================= CENTER: TABLE (LOCKED) ================= */}
      <div className="flex justify-center">
        <span
          className="
            min-w-[80px]
            text-center
            px-3 py-1
            rounded-full
            text-xs font-medium
            bg-[#2a2a2a]
            text-[#f6b100]
            border border-[#3a3a3a]
          "
        >
          Table {order.table?.tableNo || "N/A"}
        </span>
      </div>

      {/* ================= RIGHT: STATUS ================= */}
      <div className="flex flex-col items-end gap-1">
        <span
          className={`
            inline-flex items-center gap-2
            text-sm font-medium
            ${statusUI.text}
          `}
        >
          {statusUI.icon}
          {statusUI.label}
        </span>

        <span className="inline-flex items-center gap-1 text-xs text-[#9a9a9a]">
          <FaCircle className="text-green-500 text-[8px]" />
          Ready to serve
        </span>
      </div>
    </div>
  )
}
