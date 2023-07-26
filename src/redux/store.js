import { configureStore } from "@reduxjs/toolkit";
import ModalSliceReducer from "./ModalSlice";

export const store = configureStore({
  reducer: {
    modal: ModalSliceReducer,
  },
});
