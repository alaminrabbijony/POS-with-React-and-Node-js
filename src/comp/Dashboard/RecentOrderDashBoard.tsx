import {
  useQuery,
  keepPreviousData,
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import type { OrderTypes } from "../../types/types.js";
import { getOrders, updateOrderStatus } from "../../https/index.js";
import CustomeLoader from "../shared/CustomeLoading.js";
import { enqueueSnackbar } from "notistack";
import { formatBDDate } from "../../const/index.js";
import {
  DEFAULT_STATUS_STYLE,
  getOrderStatusStyle,
  type OrderStatus,
} from "../../util/style.js";

const ORDER_STATUS_OPTIONS = [
  "CREATED",
  "PAYMENT_PENDING",
  "PAYMENT_COMPLETED",
  "PAYMENT_FAILED",
] as const;

const RecentOrderDashBoard = () => {
  const QueryClient = useQueryClient();

  const handleSatusChange = ({ orderId, orderStatus }: any) => {
    console.log(orderId);
    orderStatusMutation.mutate({ orderId, orderStatus });
  };

  const orderStatusMutation = useMutation({
    mutationFn: ({ orderId, orderStatus }: any) =>
      updateOrderStatus({ orderId, orderStatus }),
    onSuccess: (data) => {
      enqueueSnackbar("Prder status successfully changed", {
        variant: "success",
      });
      QueryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      enqueueSnackbar("Failed to update order status", { variant: "error" });
    },
  });

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery<OrderTypes[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await getOrders();
      return res.data.data;
    },
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <CustomeLoader message="Orders are loading..." />;
  }

  if (isError) {
    enqueueSnackbar("Something went wrong fetching orders", {
      variant: "error",
    });
  }
  console.log(orders);

  return (
    <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
      <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
        Recent Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#333] text-[#ababab]">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Items</th>
              <th className="p-3">Table No</th>
              <th className="p-3">Total</th>
              <th className="p-3 text-center">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-600 hover:bg-[#333]"
              >
                <td className="p-4">
                  #{Math.floor(new Date(order.orderDate).getTime())}
                </td>
                <td className="p-4">{order.customerDetails.name}</td>
                <td className="p-4">
                  {(() => {
                    const statusUI = getOrderStatusStyle(order.orderStatus);

                    return (
                      <div className="flex items-center gap-2">
                        {/* STATUS BADGE */}
                        <span
                          className={`
            inline-flex items-center gap-2
            px-3 py-1 rounded-full
            text-xs font-medium
            ${statusUI.bg} ${statusUI.text}
          `}
                        >
                          {statusUI.icon}
                          {statusUI.label}
                        </span>

                        {/* STATUS SELECT */}
                        <select
                          value={order.orderStatus}
                          // disabled={orderStatusMutation.isLoading}
                          onChange={(e) =>
                            handleSatusChange({
                              orderId: order._id,
                              orderStatus: e.target.value,
                            })
                          }
                          className="
            bg-[#1a1a1a]
            border border-[#3a3a3a]
            text-xs text-[#f5f5f5]
            rounded-md px-2 py-1
            focus:outline-none focus:ring-1 focus:ring-green-500/40
          "
                        >
                          {ORDER_STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status.replaceAll("_", " ")}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  })()}
                </td>

                <td className="p-4">{formatBDDate(order.orderDate)}</td>
                <td className="p-4">{order.items.length} Items</td>
                <td className="p-4">Table - {order.table?.tableNo}</td>
                <td className="p-4">৳ {order.bills.totalWithTax}</td>
                <td className="p-4">{order.payment?.provider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrderDashBoard;
