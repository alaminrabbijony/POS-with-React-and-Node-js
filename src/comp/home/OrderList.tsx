import { FaCheckDouble, FaCircle } from "react-icons/fa";

export default function OrderList() {
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center justify-between w-full">
        
        {/* Left Section */}
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            ARJ
          </h1>
          <p className="text-[#ababab] text-sm">8 Items</p>
        </div>

        {/* Middle Section */}
        <div>
          <h1 className="text-[#f6b100] font-semibold border border-[#f6b100] rounded-lg p-1">
            Table No: 1
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start gap-2">
          <p className="text-green-600 px-4">
            <FaCheckDouble className="inline mr-2" />
            Ready
          </p>

          <p className="text-[#ababab] text-sm">
            <FaCircle className="inline mr-2 text-green-600" />
            Ready to Serve
          </p>
        </div>

      </div>
    </div>
  );
}
