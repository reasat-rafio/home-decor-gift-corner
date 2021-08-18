import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectDom = (state: RootState) => state.dom;

export const domSelector = createSelector(selectDom, (state) => state);
