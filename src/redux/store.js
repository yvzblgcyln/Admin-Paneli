import { configureStore } from "@reduxjs/toolkit";
import ModalSliceReducer from "./ModalSlice";
import GeneralSliceReducer from "./GeneralSlice";

export const store = configureStore({
  reducer: {
    modal: ModalSliceReducer,
    general: GeneralSliceReducer,
  },
});
