
import { IoRestaurantOutline } from "react-icons/io5";
import BackBtn from "../comp/shared/BackBtn.js";
import MenuContainer from "../comp/Menu/MenuContainer.js";
import CustomerInfo from "../comp/Menu/CustomerInfo.js";
import CartInfo from "../comp/Menu/CartInfo.js";
import BillsInfo from "../comp/Menu/BillsInfo.js";
import { useSelector } from "react-redux";

export default function Menu() {
  const customerData = useSelector( (state: any) => state.customer)

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] flex flex-row">

      {/* Left Section */}
      <div className="flex-[7] border-r border-gray-700">
        <div className="flex items-center justify-between px-10 py-4 mt-2">

          {/* Menu Header */}
          <div className="flex items-center gap-4">
            <BackBtn />
            <h1 className="text-[#f5f5f5] text-2xl font-bold">Menu</h1>
          </div>

          {/* Customer/Table Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <IoRestaurantOutline className="text-3xl text-gray-400" />
              <div className="leading-tight">
                <h1 className="text-[#f5f5f5] text-sm font-bold">
                  {customerData.customerName || "Customer Name"}
                </h1>
                <p className="text-xs text-gray-500">Table: {customerData.table?.tableNo}</p>
              </div>
            </div>
          </div>

        </div>

        <MenuContainer />
      </div>

      {/* Right Section */}
      <div className="flex-[3] bg-[#1a1a1a] mt-4 mr-3 h-[780px] rounded-lg pt-2">

        {/* Customer Info */}
        <CustomerInfo />

        <hr className="border-[#2a2a2a] border-t-2" />

        {/* Cart Items */}
        <CartInfo />

        {/* Bills */}
        <BillsInfo />
      </div>

    </section>
  );
}
