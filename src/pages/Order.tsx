import { useState } from "react";
import BackBtn from "../comp/shared/BackBtn.js";
import OrderCard from "../comp/order/OrderCard.js";
import BottomNav from "../comp/shared/BottomNav.js";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrders } from "../https/index.js";
import { enqueueSnackbar } from "notistack";
import type { OrderTypes } from "../types/types.js";
import CustomeLoader from "../comp/shared/CustomeLoading.js";

export default function Order() {
  const [status, setStatus] = useState<string>("All");
  const { data: orders = [], isError, isLoading } = useQuery<OrderTypes[]>(
    {
      queryKey: ["orders"],
      queryFn: async () => {
       const res = await getOrders();
        return res.data.data

      },
      placeholderData: keepPreviousData,
    }
  );

  if(isLoading){
    return <CustomeLoader message="Orders are loading....." />
  }

  if (isError)
    enqueueSnackbar("Something went wrong while fetching data", {
      variant: "error",
    });

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-10 py-4 mt-2">
        {/* Left */}
        <div className="flex items-center gap-4">
          <BackBtn />
          <h1 className="text-[#f5f5f5] text-2xl font-bold">Orders</h1>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setStatus("All")}
            className={`
              text-[#ababab] text-lg px-5 py-2 font-semibold rounded-lg 
              hover:bg-[#2a2a2a]
              ${status === "All" ? "bg-[#383838]" : ""}
            `}
          >
            All
          </button>

          <button
            onClick={() => setStatus("In Progress")}
            className={`
              text-[#ababab] text-lg px-5 py-2 font-semibold rounded-lg 
              hover:bg-[#2a2a2a]
              ${status === "In Progress" ? "bg-[#383838]" : ""}
            `}
          >
            In Progress
          </button>

          <button
            onClick={() => setStatus("Ready")}
            className={`
              text-[#ababab] text-lg px-5 py-2 font-semibold rounded-lg 
              hover:bg-[#2a2a2a]
              ${status === "Ready" ? "bg-[#383838]" : ""}
            `}
          >
            Ready
          </button>

          <button
            onClick={() => setStatus("Completed")}
            className={`
              text-[#ababab] text-lg px-5 py-2 font-semibold rounded-lg 
              hover:bg-[#2a2a2a]
              ${status === "Completed" ? "bg-[#383838]" : ""}
            `}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Orders Grid */}
      <div
        className="
          grid 
          auto-rows-auto
          [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]
          gap-8
          px-10
          pb-24
          overflow-y-auto
          scrollbar-hide
          flex-1
          w-full
        "
      >
        {orders.length > 0 ? (
         orders.map((order) => {
            return <OrderCard key={order._id} order={order} />;
          })
        ) : (
          <p className="col=span=3 text-gray-500">No Orders available</p>
        )}
      </div>

      <BottomNav />
    </section>
  );
}
