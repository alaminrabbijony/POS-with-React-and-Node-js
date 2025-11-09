import { useState } from "react";
import BottomNav from "../comp/shared/BottomNav";
import BackBtn from "../comp/shared/BackBtn";
import TableCard from "../comp/Tables/TableCard";
import { tables } from "../const/const";

const Tables = () => {
  const [status, setStatus] = useState("All");

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-10 py-4 mt-2">
        <div className="flex items-center gap-4">
          <BackBtn />
          <h1 className="text-[#f5f5f5] text-2xl font-bold">Orders</h1>
        </div>

        <div className="flex items-center gap-4">
          {["All", "Booked"].map((label) => (
            <button
              key={label}
              onClick={() => setStatus(label)}
              className={`text-[#ababab] text-lg font-semibold px-5 py-2 rounded-lg transition-all duration-150 ${
                status === label
                  ? "bg-[#383838] text-[#f5f5f5]"
                  : "hover:bg-[#2a2a2a]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table Grid */}
      <div
        className="
          grid 
          grid-cols-[repeat(auto-fit,minmax(320px,1fr))] 
          gap-8 
          px-10 
          pb-24 
          overflow-y-auto 
          scrollbar-hide 
          flex-1 
          w-full
        "
      >
        {tables.map((table) => {
          return (
            <TableCard key={table.id}
              name={table.name}
              status={table.status}
              initials={table.initial}
            />
          )
        })}
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;
