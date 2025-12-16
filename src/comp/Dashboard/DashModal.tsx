import React, { useState } from "react";

import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import type { ErrorRes, tableObjProps } from "../../types/types.js";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { Axios, AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { createTable } from "../../store/redux/slices/tableSlice.js";
import { addTable } from "../../https/index.js";

const tableObj: tableObjProps = {
  tableNo: "",
  seats: "",
  status: "available",
};

const DashModal = ({ setIsTableModalOpen }: any) => {
  const [tableData, setTableData] = useState(tableObj);
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(tableData);
    addTableMutation.mutate(tableData);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setTableData((prev) => ({ ...prev, [name]: value }));
  };
  const handleModalClose = () => {
    return setIsTableModalOpen(false);
  };

  const addTableMutation = useMutation<
    any,
    AxiosError<ErrorRes>,
    tableObjProps
  >({
    mutationFn: (reqData) => addTable(reqData),
    onSuccess: (res) => {
      const { data } = res.data;
      dispatch(createTable(data)); //Local first
      setIsTableModalOpen(false);
      enqueueSnackbar(data.message, { variant: "success" });
    },
    onError: (err) => {
      const msg = err.response?.data?.message;
      enqueueSnackbar(msg, { variant: "error" });
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-96"
      >
        {/* DashModal Header */}

        <div className="flex justify-between item-center mb-4">
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Add Table</h2>
          <button
            onClick={handleModalClose}
            className="text-[#f5f5f5] hover:text-red-500"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* DashModal Body */}

        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
          <div>
            <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
              Table Number
            </label>
            <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
              <input
                type="number"
                name="tableNo"
                value={tableData.tableNo}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
              Number of Seats
            </label>
            <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
              <input
                type="number"
                name="seats"
                value={tableData.seats}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg mt-10 mb-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
            onClick={() => handleModalClose}
          >
            Add Table
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default DashModal;
