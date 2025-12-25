import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList.js";
import { useQuery } from "@tanstack/react-query";
import type { OrderTypes } from "../../types/types.js";
import { getOrders } from "../../https/index.js";
import CustomeLoader from "../shared/CustomeLoading.js";
import { enqueueSnackbar } from "notistack";

export default function RecentOrders() {
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
  });

  if (isLoading) {
    return <CustomeLoader message="Orders are loading..." />;
  }

  if (isError) {
    enqueueSnackbar("Something went wrong while fetching orders", {
      variant: "error",
    });
  }

  return (
    <div className="px-8 mt-6">
      {/* Header Row */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
          Recent Orders
        </h1>
        <a className="text-[#025cca] text-sm font-semibold" href="#">
          View All
        </a>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-[#1a1a1a] px-6 py-3 rounded-[15px] mx-6">
        <FaSearch className="text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent w-full text-sm outline-none placeholder-gray-500 text-gray-200"
        />
      </div>

      {/* Order List */}
      <div className="mt-4 px-6 overflow-y-scroll h-[300px] scrollbar-hide">
        {orders.map((order) => (
          <OrderList key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}
