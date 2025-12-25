import { useNavigate } from "react-router-dom";
import { getAvatar, getRandomBG } from "../../const/index.js";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/redux/store.js";
import { updateTable } from "../../store/redux/slices/CustomerSlices.js";
import { MdDeleteForever } from "react-icons/md";
import { removeTable } from "../../store/redux/slices/tableSlice.js";
import { useMutation } from "@tanstack/react-query";
import { deleteTable } from "../../https/index.js";
import type { AxiosError } from "axios";
import type { ErrorRes } from "../../types/types.js";
import { enqueueSnackbar } from "notistack";
import { FaLongArrowAltRight } from "react-icons/fa";

type TableCardProps = {
  id: string;
  name: string;
  seats: string;
  status: "Booked" | "Available" | string;
  initials: string;
};

export default function TableCard({ id, name, status, initials }: TableCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.user);

  const handleClick = () => {
    if (status === "Booked") return;
    const table = { tableId: id, tableNo: name };
    dispatch(updateTable({table}));
    navigate("/menu");
  };

  const handleRemoveTable = () => {};

  return (
    <div
      onClick={handleClick}
      key={id}
      className="bg-[#262626] border border-[#2f2f2f] rounded-xl p-6 w-full min-h-[180px] 
      hover:bg-[#2e2e2e] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer 
      flex flex-col justify-between"
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">
          Table<FaLongArrowAltRight className="text-[#ababab] ml-2 inline" />
           {name}
        </h1>

        <p
          className={`${
            status === "Booked"
              ? "text-green-600 bg-[#2e4a40]"
              : "bg-[#664a04] text-white"
          } px-2 py-3 rounded-lg`}
        >
          {status}
        </p>
      </div>

      <div className="flex items-center justify-center my-5">
        <h1 className={`text-white rounded-full p-5 text-xl`}
         style={{backgroundColor : initials ? getRandomBG() : "#1f1f1f"}} >
          {getAvatar(initials) || "N/A"}
          </h1>
      </div>
      {/* {userData.role === "Admin" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveTable();
          }}
          className="self-end mt-2 p-2 rounded-lg hover:bg-red-900/30 transition"
          aria-label="Delete table"
        >
          <MdDeleteForever size={40} className="text-red-500" />
        </button>
      )} */}

      
    </div>
  );
}
