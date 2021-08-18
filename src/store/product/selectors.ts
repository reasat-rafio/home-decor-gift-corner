import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectProduct = (state: RootState) => state.product;

export const productSelector = createSelector(selectProduct, (state) => state);
