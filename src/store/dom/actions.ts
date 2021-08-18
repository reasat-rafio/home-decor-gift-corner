import { createAction } from "@reduxjs/toolkit";

export const SHOW_SEARCH_PAGE = createAction("dom/SHOW_SEARCH_PAGE");
export const HIDE_SEARCH_PAGE = createAction("dom/HIDE_SEARCH_PAGE");
export const SHOW_SIDE_MENU = createAction("dom/SHOW_SIDE_MENU");
export const HIDE_SIDE_MENU = createAction("dom/HIDE_SIDE_MENU");
export const LOADING_START = createAction("dom/LOADING_START");
export const LOADING_END = createAction("dom/LOADING_END");
export const SHOW_CART_SIDE_MENU = createAction("dom/SHOW_CART_SIDE_MENU");
export const HIDE_CART_SIDE_MENU = createAction("dom/HIDE_CART_SIDE_MENU");
export const SHOW_SHOP_CATEGORY_SIDE_MENU = createAction(
  "dom/SHOW_SHOP_CATEGORY_SIDE_MENU"
);
export const HIDE_SHOP_CATEGORY_SIDE_MENU = createAction(
  "dom/HIDE_SHOP_CATEGORY_SIDE_MENU"
);
export const CLEAR = createAction("dom/CLEAR");
