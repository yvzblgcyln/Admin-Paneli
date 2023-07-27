import { createSlice } from "@reduxjs/toolkit";

export const GeneralSlice = createSlice({
  name: "General",
  initialState: { SideBarOpen: true },
  reducers: {
    setSideBarOpen: (state) => {
      state.SideBarOpen = !state.SideBarOpen;
    },
    setSideBarClose: (state) => {
      state.SideBarOpen = false;
    },
  },
});

export const { setSideBarOpen, setSideBarClose } = GeneralSlice.actions;
export default GeneralSlice.reducer;
