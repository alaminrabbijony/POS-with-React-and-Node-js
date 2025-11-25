import React, { useState } from "react";
import { FaNotesMedical } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import type { CartItem } from "../../store/Types.js";
import type { AppDispatch } from "../../store/redux/store.js";
import { removeItemFromCart } from "../../store/redux/slices/cartSlice.js";

const CartInfo = () => {
  const cartData = useSelector((state: any) => state.cart);
  const [counts, setCounts] = useState<Record<number, number>>({});

  const dispatch = useDispatch<AppDispatch>()



  const handleRemoveFromCart = (id: string | number) => {
    dispatch(removeItemFromCart(id))
  }

  return (
    <div className="px-4 py-2">
      <h1 className="text-lg text-[#e4e4e4] font-semibold tracking-wide">
        Order Details
      </h1>
      <div className="mt-4 overflow-y-scroll scrollbar-hide h-[380px]">
        <div className="bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2">
          {cartData.length === 0 ? (
            <p className="text-[#ababab] text-sm flex justify-center items-center h-[380px]">
              {" "}
              Cart is Empty. Add Items to Cart
            </p>
          ) : (
            cartData.items.map((item: CartItem) => (
              <>
                <div className="flex items-center justify-between ">
                  <h1 className="text-[#ababab] font-semibold tracling-wide text-md">
                    {item.name}
                  </h1>
                  <p className="text-[#ababab] font-semibold">
                    x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3 ">
                  <div className="flex items-center gap-3">
                    <RiDeleteBin2Fill
                      className="text-[red] cursor-pointer" // del Btn
                      size={24}
                      onClick={() => handleRemoveFromCart(item.id)}
                    />
                    <FaNotesMedical
                      className="text-[green] cursor-pointer" // add extra
                      size={24}
                      // onClick={() => handleEditCart(item.id)}
                    />
                  </div>
                  <p className="text-[#f5f5f5] text-md  font-bold">
                    $ {item.totalPrice.toFixed(2)}
                  </p>
                </div>
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
