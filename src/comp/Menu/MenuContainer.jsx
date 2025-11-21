import React, { useState } from "react";
import { menus } from "../../const/const";
import { getRandomBG } from "../../const";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";

const MenuContainer = () => {
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);
  const [count, setCount] = useState(0);
  const [itemId, setItemId] = useState(null);

  // each item in menu can be counted separately
  //  const [counts, setCounts] = useState({});
  //   const increment = (id) => {
  //   setCounts((prev) => {
  //     const current = prev[id] || 0;
  //     if (current >= 4) return prev;

  //     return {
  //       ...prev,
  //       [id]: current + 1,
  //     };
  //   });
  // };

  // const decrement = (id) => {
  //   setCounts((prev) => {
  //     const current = prev[id] || 0;
  //     if (current <= 0) return prev;

  //     return {
  //       ...prev,
  //       [id]: current - 1,
  //     };
  //   });
  // };

  const increment = (id) => {
    if (count >= 4) return;
    setItemId(id);
    setCount((prev) => prev + 1);
  };
  const decrement = (id) => {
    if (count <= 0) return;
    setItemId(id);
    setCount((prev) => prev - 1);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
              style={{ backgroundColor: menu.bgColor }}
              onClick={() => {
                setSelectedMenu(menu);
                setItemId(0);
              }}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {menu.icon} {menu.name}
                </h1>
                {selectedMenu.id === menu.id && (
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

      <br className="border-[#2a2a2a] border-t-2 mt-4" />
      {/* items from selected menu */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {selectedMenu?.items.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col items-start justify-between gap-3 p-4 rounded-lg min-h-[130px] cursor-pointer 
hover:bg-[#2a2a2a] bg-[#1a1a1a]"
              style={{ backgroundColor: "#2a2a2a" }}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {item.name}
                </h1>
                <button className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg">
                  {" "}
                  <FaShoppingCart size={24} />
                </button>
              </div>

              <p className="text-[#ababab] text-xl font-bold">${item.price}</p>
              <div className="w-full mt-auto">
                <div className="flex items-center justify-between bg-[#111] px-4 py-2 rounded-lg border border-[#2a2a2a]">
                  <button
                    onClick={() => decrement(item.id)}
                    className="text-yellow-400 text-xl px-2 hover:scale-110 active:scale-95 transition-all"
                  >
                    &minus;
                  </button>
                  <span className="text-white font-semibold text-lg select-none">
                    {itemId === item.id ? count : 0}{" "}
                  </span>
                  <button
                    onClick={() => increment(item.id)}
                    className="text-yellow-400 text-xl px-2 hover:scale-110 active:scale-95 transition-all"
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
};

export default MenuContainer;
