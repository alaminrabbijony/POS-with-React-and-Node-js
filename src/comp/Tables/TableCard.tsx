import { useNavigate } from "react-router-dom";
import { getRandomBG } from "../../const/index.js";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/redux/store.js";
import { updateTable } from "../../store/redux/slices/CustomerSlices.js";


type TableCardProps = {
  name: string;
  status: "Booked" | "Available" | string;
  initials: string;
};

export default function TableCard({
  name,
  status,
  initials,
}: TableCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()

  const handleClick = () => {
    if (status === "Booked") return;
    dispatch(updateTable({tableNo: name}));
    navigate("/menu");
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#262626] border border-[#2f2f2f] rounded-xl p-6 w-full min-h-[180px] 
      hover:bg-[#2e2e2e] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer 
      flex flex-col justify-between"
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">{name}</h1>

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
        <h1 className={`${getRandomBG()} text-white rounded-full p-5 text-xl`}>
          {initials}
        </h1>
      </div>
    </div>
  );
}
