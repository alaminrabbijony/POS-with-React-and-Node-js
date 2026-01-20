import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteTable, getTableData } from "../../https/index.js";
import CustomeLoader from "../shared/CustomeLoading.js";
import { enqueueSnackbar } from "notistack";
import { MdDeleteForever } from "react-icons/md";

const TablesBoard = () => {
  const [status, setStatus] = useState();
    const queryClient = useQueryClient()
  const { data, isError, isLoading } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTableData();
    },
    placeholderData: keepPreviousData,
  });

    const deleteMutation = useMutation({
    mutationFn: (tableId: string) => deleteTable(tableId),
    onMutate: async (tableId) => {
        await queryClient.cancelQueries({queryKey: ["tables"]})
        const prev = queryClient.getQueryData(["tables"])

        queryClient.setQueryData(["tables"], (old: any) => {
            return {
                ...old,
                data: {
                    ...old,
                    data: old.data.data.filter((t:any)=> t._id !== tableId)
                }
            }
        })
        return {prev}

    },
    onError: (err, _tableId, context) => {
        queryClient.setQueryData(["tables"], context?.prev)
        enqueueSnackbar("Failed to delete table", { variant: "error" });
    },
    onSettled: () => {
        queryClient.invalidateQueries({queryKey: ["tables"]})
    }
  })

  if (isLoading) return <CustomeLoader message="Tables are loading..." />;

  if (isError) {
    enqueueSnackbar("something went wrong while fetching tables", {
      variant: "error",
    });
    return null
  }

  if (!data?.data?.data) {
    return <CustomeLoader message="Tables are loading..." />;
  }



 
  

  const tables = data.data.data;

  return (
    <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
      <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
        All Tables
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#333] text-[#ababab]">
            <tr>
              <th className="p-3">Table No</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Seats</th>
              <th className="p-3 text-red-500">Remove</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table: any) => (
              <tr
                key={table._id}
                className="border-b border-gray-600 hover:bg-[#333]"
              >
                <td className="p-4">{table.tableNo}</td>
                <td className="p-4">
                  {table.currentOrder?.customerDetails.name || "N/A"}
                </td>
                {/* <td className="p-4">
                      {(() => {
                        const statusUI = getOrderStatusStyle(order.orderStatus);
    
                        return (
                          <div className="flex items-center gap-2">
                           
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
                    </td> */}

                {/* <td className="p-4">{formatBDDate(order.orderDate)}</td> */}
                <td className="p-4">{table.status}</td>
                <td className="p-4">{table.seats}</td>
                {/* <td className="p-4">৳ {order.bills.totalWithTax}</td>
                    <td className="p-4">{order.payment?.provider}</td> */}
                <td className="p-4">
                  <button
                    onClick={() => deleteMutation.mutate(table._id)}
                    className="self-end mt-2 p-2 rounded-lg hover:bg-red-900/30 transition"
                    aria-label="Delete table"
                  >
                    <MdDeleteForever size={40} className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablesBoard;
