import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineBorderColor, MdTableBar, MdMoreHoriz } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal.js";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/redux/store.js";
import { setCustomerInfo } from "../../store/redux/slices/CustomerSlices.js";

export default function BottomNav() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const customer = useSelector((state: any) => state.customer);
  const dispatch = useDispatch<AppDispatch>();

  const isActive = (path: string) => location.pathname === path;

  const decrement = () =>
    dispatch(
      setCustomerInfo({
        ...customer,
        guest: Math.max((customer.guest || 0) - 1, 0),
      })
    );

  const increment = () =>
    dispatch(
      setCustomerInfo({
        ...customer,
        guest: Math.min((customer.guest || 0) + 1, 6),
      })
    );

  return (
    <>
      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 h-[72px] 
                   bg-[#1f1f1f] border-t border-[#2a2a2a]
                   flex items-center justify-around
                   text-xs text-[#bdbdbd] z-50"
      >
        {/* Home */}
        <NavItem
          active={isActive("/")}
          label="Home"
          icon={<FaHome size={18} />}
          onClick={() => navigate("/")}
        />

        {/* Orders */}
        <NavItem
          active={isActive("/order")}
          label="Orders"
          icon={<MdOutlineBorderColor size={18} />}
          onClick={() => navigate("/order")}
        />

        {/* Tables */}
        <NavItem
          active={isActive("/tables")}
          label="Tables"
          icon={<MdTableBar size={18} />}
          onClick={() => navigate("/tables")}
        />

        {/* More */}
        <NavItem
          label="More"
          icon={<MdMoreHoriz size={18} />}
        />
      </nav>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed 
                   bottom-[calc(var(--bottom-nav-h,72px)+12px)] 
                   right-6 z-50
                   bg-[#F6B100] text-black
                   w-14 h-14 rounded-full
                   flex items-center justify-center
                   shadow-lg hover:scale-105 transition"
      >
        <BiSolidDish size={22} />
      </button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Order">
        {/* Customer Name */}
        <Field label="Customer Name">
          <input
            value={customer.customerName ?? ""}
            onChange={(e) =>
              dispatch(setCustomerInfo({ ...customer, name: e.target.value }))
            }
            placeholder="Enter customer name"
            className="input"
          />
        </Field>

        {/* Phone */}
        <Field label="Phone Number">
          <input
            value={customer.customerPhone ?? ""}
            onChange={(e) =>
              dispatch(setCustomerInfo({ ...customer, phone: e.target.value }))
            }
            placeholder="+8801XXXXXXXXX"
            className="input"
          />
        </Field>

        {/* Guest */}
        <div className="mt-4">
          <label className="text-sm text-[#ababab] mb-2 block">Guests</label>
          <div className="flex items-center justify-between bg-[#1f1f1f] rounded-lg px-4 py-3">
            <button onClick={decrement} className="text-yellow-500 text-xl">
              −
            </button>
            <span className="text-white">{customer.guest || 0} Person</span>
            <button onClick={increment} className="text-yellow-500 text-xl">
              +
            </button>
          </div>
        </div>

        <button
          className="w-full bg-[#F6B100] text-black rounded-lg py-3 mt-6 font-semibold"
          onClick={() => {
            navigate("/tables");
            setIsModalOpen(false);
          }}
        >
          Create Order
        </button>
      </Modal>
    </>
  );
}

/* ---------- Reusable Components ---------- */

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full
        ${active ? "text-white" : "text-[#9a9a9a]"}
        hover:text-white transition`}
    >
      {icon}
      <span className="mt-1 text-[11px] font-medium">{label}</span>
    </button>
  );
}

function Field({ label, children }: any) {
  return (
    <div className="mt-4">
      <label className="block text-sm text-[#ababab] mb-2">{label}</label>
      <div className="bg-[#1f1f1f] rounded-lg px-4 py-3">{children}</div>
    </div>
  );
}
