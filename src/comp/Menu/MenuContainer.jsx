import React, { useState } from "react";
import { menus } from "../../const/const";
import { getRandomBG } from "../../const";
import { GrRadialSelected } from "react-icons/gr";

const MenuContainer = () => {
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
              style={{ backgroundColor: menu.bgColor }}
              onClick={() => setSelectedMenu(menu)}
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
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer 
              hover:bg-[#2a2a2a] bg-[#1a1a1a]
              "
              style={{ backgroundColor: '#2a2a2a' }}
              
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                   {item.name}
                </h1>
              </div>

              <p className="text-[#ababab] text-xl font-bold">
                ${item.price}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuContainer;
