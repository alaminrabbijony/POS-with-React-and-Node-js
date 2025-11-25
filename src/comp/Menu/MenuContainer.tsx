import { useState } from "react";
import type { ReactNode } from "react";

import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";

import { menus } from "../../const/const.js";

/**
 * Types (matches structure in const file)
 */
type MenuItem = {
  id: number;
  name: string;
  price: number;
};

type Menu = {
  id: number;
  name: string;
  bgColor?: string;
  icon?: ReactNode;
  items: MenuItem[];
};

/**
 * MenuContainer (TSX)
 *
 * - Per-item quantity tracking via `counts: Record<itemId, qty>`
 * - Limits qty between 0 and 4 (same behavior)
 */

export default function MenuContainer() {
  const [selectedMenu, setSelectedMenu] = useState<Menu>(menus[0] as Menu);
  const [counts, setCounts] = useState<Record<number, number>>({});

  const increment = (id: number) => {
    setCounts((prev) => {
      const current = prev[id] ?? 0;
      if (current >= 4) return prev;
      return { ...prev, [id]: current + 1 };
    });
  };

  const decrement = (id: number) => {
    setCounts((prev) => {
      const current = prev[id] ?? 0;
      if (current <= 0) return prev;
      return { ...prev, [id]: current - 1 };
    });
  };

  return (
    <>
      {/* Categories / Menus */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {menus.map((menu: Menu) => {
          const bg = menu.bgColor ?? "#1a1a1a";
          return (
            <div
              key={menu.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px]
               cursor-pointer"
              style={{ backgroundColor: bg }}
              onClick={() => {
                setSelectedMenu(menu);
              }}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold flex items-center gap-2">
                  {menu.icon} <span>{menu.name}</span>
                </h1>

                {selectedMenu?.id === menu.id && (
                  <GrRadialSelected className="text-white" size={20} />
                )}
              </div>

              <p className="text-[#ababab] text-sm font-semibold">
                {menu.items.length} Items
              </p>
            </div>
          );
        })}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      {/* Items for selected menu */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {selectedMenu?.items.map((item: MenuItem) => {
          const qty = counts[item.id] ?? 0;

          return (
            <div
              key={item.id}
              className="flex flex-col items-start justify-between gap-3 p-4 rounded-lg
               min-h-[130px] cursor-pointer hover:bg-[#2a2a2a] bg-[#1a1a1a]"
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">{item.name}</h1>

                <button
                  aria-label={`add-${item.name}`}
                  title="Add to quick cart"
                  className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg"
                >
                  <FaShoppingCart size={20} />
                </button>
              </div>

              <p className="text-[#ababab] text-xl font-bold">${item.price}</p>

              <div className="w-full mt-auto">
                <div className="flex items-center justify-between bg-[#111] px-4 py-2 
                rounded-lg border border-[#2a2a2a]">
                  <button
                    onClick={() => decrement(item.id)}
                    className="text-yellow-400 text-xl px-2 hover:scale-110 active:scale-95 
                    transition-all"
                    aria-label={`decrement-${item.id}`}
                  >
                    &minus;
                  </button>

                  <span className="text-white font-semibold text-lg select-none">
                    {qty}
                  </span>

                  <button
                    onClick={() => increment(item.id)}
                    className="text-yellow-400 text-xl px-2 hover:scale-110 
                    active:scale-95 transition-all"
                    aria-label={`increment-${item.id}`}
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
