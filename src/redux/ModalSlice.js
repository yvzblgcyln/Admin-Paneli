import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
  name: "Modals",
  initialState: { warningModal: false, warningModalAccept: false },
  reducers: {
    setWarningModal: (state) => {
      state.warningModal = !state.warningModal;
    },
    setWarningModalAccept: (state, { payload }) => {
      state.warningModalAccept = payload;
    },
  },
});

export const { setWarningModal, setWarningModalAccept } = ModalSlice.actions;
export default ModalSlice.reducer;
