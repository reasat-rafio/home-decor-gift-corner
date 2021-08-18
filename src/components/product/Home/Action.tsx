import React from "react";
import { ActionProps } from "../../../../libs/types/productTypes";
import { SHOW_CART_SIDE_MENU } from "../../../store/dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  ADD_TO_THE_CART,
  PLUS_QUANTITY,
  selectProduct,
} from "../../../store/product";

export const Action: React.FC<ActionProps> = ({
  quantity,
  setQuantity,
  product,
}) => {
  const dispatch = useAppDispatch();
  const productsAddedInCart = useAppSelector(selectProduct);
  const _product = { ...product, quantity };

  const addToCartAction = (): void => {
    const doesExistInCart: boolean = productsAddedInCart.inCartProducts.some(
      (product) => product.title == _product.title
    );

    doesExistInCart
      ? dispatch(PLUS_QUANTITY(_product))
      : dispatch(ADD_TO_THE_CART(_product));

    dispatch(SHOW_CART_SIDE_MENU());
  };
  return (
    <div className="flex items-center space-x-5">
      <div className="flex space-x-3 items-center">
        <div
          className="bg-white p-2 rounded-full cursor-pointer hover:drop-shadow transition-all duration-150"
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>
        <p>{quantity}</p>
        <div
          className="bg-white p-2 rounded-full cursor-pointer transition-all duration-150 hover:drop-shadow"
          onClick={() => setQuantity((prev) => (prev >= 2 ? prev - 1 : prev))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <button
        className="relative block border-2 border-yellow-400 lg:px-8 lg:py-3 lg:text-base rounded-lg overflow-hidden  btn btn3 px-6 py-[10px] text-sm"
        onClick={addToCartAction}
      >
        ADD TO CART
      </button>
    </div>
  );
};
