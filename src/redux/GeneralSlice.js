import { createSlice } from "@reduxjs/toolkit";

export const GeneralSlice = createSlice({
  name: "General",
  initialState: { SideBarOpen: true },
  reducers: {
    setSideBarOpen: (state) => {
      state.SideBarOpen = !state.SideBarOpen;
    },
  },
});

export const { setSideBarOpen } = GeneralSlice.actions;
export default GeneralSlice.reducer;
