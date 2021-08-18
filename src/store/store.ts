import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { productReducer } from "./product/reducer";
import { domReducer } from "./dom";

const reducers = combineReducers({
  product: productReducer,
  dom: domReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["product"],
  blacklist: ["dom"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
