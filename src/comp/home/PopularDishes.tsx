import { popularDishes } from "../../const/const.js";
import type { ReactNode } from "react";

// Type the dish model (matches your const file)
type Dish = {
  id: number;
  name: string;
  numberOfOrders: number;
  image: string;
};

export default function PopularDishes() {
  return (
    <div className="mt-6 pr-6">
      <div className="bg-[#1a1a1a] w-full rounded-lg">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Popular Dishes
          </h1>
          <a className="text-[#025cca] text-sm font-semibold" href="#">
            View All
          </a>
        </div>

        {/* Dishes list */}
        <div className="overflow-y-scroll h-[680px] scrollbar-hide pb-4">
          {popularDishes.map((dish: Dish) => (
            <div
              key={dish.id}
              className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-6 mb-3"
            >
              <h1 className="text-[#f5f5f5] font-bold text-xl mr-5">
                {dish.id < 10 ? `0${dish.id}` : dish.id}
              </h1>

              <img
                src={dish.image}
                alt={dish.name}
                className="w-[50px] h-[50px] rounded-full object-cover"
              />

              <div>
                <h1 className="text-[#f5f5f5] font-semibold tracking-wide">
                  {dish.name}
                </h1>

                <p className="text-[#ababab] text-sm font-semibold mt-1">
                  {dish.numberOfOrders} <span className="text-[#ababab]">Orders</span>
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
