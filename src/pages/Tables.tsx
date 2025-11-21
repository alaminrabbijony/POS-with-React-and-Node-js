import { useState } from "react";

import BottomNav from "../comp/shared/BottomNav.js";


import { tables } from "../const/const.js";
import BackBtn from "../comp/shared/BackBtn.js";
import TableCard from "../comp/Tables/TableCard.js";

export default function Tables() {
  const [status, setStatus] = useState<string>("All");

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-10 py-4 mt-2">
        {/* Title */}
        <div className="flex items-center gap-4">
          <BackBtn />
          <h1 className="text-[#f5f5f5] text-2xl font-bold">Tables</h1>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-4">
          {["All", "Booked"].map((label) => (
            <button
              key={label}
              onClick={() => setStatus(label)}
              className={`text-[#ababab] text-lg font-semibold px-5 py-2 rounded-lg
                transition-all duration-150
                ${
                  status === label
                    ? "bg-[#383838] text-[#f5f5f5]"
                    : "hover:bg-[#2a2a2a]"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tables Grid */}
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
        {tables.map((table) => (
          <TableCard
            key={table.id}
            name={table.name}
            status={table.status}
            initials={table.initial}
          />
        ))}
      </div>

      <BottomNav />
    </section>
  );
}
