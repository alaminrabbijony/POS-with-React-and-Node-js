import React, { useState, useEffect } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../comp/Dashboard/Metrics.js";

import RecentOrderDashBoard from "../comp/Dashboard/RecentOrderDashBoard.js";

import CreateTableModal from "../comp/Dashboard/DashModal.js";
import TablesBoard from "../comp/Dashboard/TablesBoard.js";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payments", "Tables"];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Metrics");
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  const handleModal = (action: any) => {
    if (action === "table") return setIsTableModalOpen(true);
  };

  return (
    <div className="bg-[#1f1f1f] h-[calc(100vh-5rem)] flex flex-col overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between border-b border-[#2a2a2a]">
        <div className="flex items-center gap-3">
          {buttons.map(({ label, icon, action }) => {
            return (
              <button
                onClick={() => handleModal(action)}
                className="bg-[#181818] hover:bg-[#2a2a2a] px-5 py-2.5 rounded-md 
             text-[#f5f5f5] font-medium text-sm flex items-center gap-2 
             border border-[#2a2a2a] transition"
              >
                {label} {icon}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {tabs.map((tab) => {
            return (
              <button
                className={`px-6 py-2.5 rounded-md text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-[#2a2a2a] text-white"
                    : "bg-transparent text-[#bdbdbd] hover:text-white hover:bg-[#242424]"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-[var(--bottom-nav-h,72px)]">
        {activeTab === "Metrics" && <Metrics />}
        {activeTab === "Orders" && <RecentOrderDashBoard />}
        {activeTab === "Payments" && (
          <div className="text-white p-6">Payment Component Coming Soon</div>
        )}
        {activeTab === "Tables" && <TablesBoard />}
      </div>

      {isTableModalOpen && (
        <CreateTableModal setIsTableModalOpen={setIsTableModalOpen} />
      )}
    </div>
  );
};

export default Dashboard;
