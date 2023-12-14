import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: false
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    isOpenMenu: (state) => {
      state.menu = true;
    },
    isCloseMenu: (state) => {
      state.menu = false;
    }
  }
})

export default menuSlice.reducer;
export const { isOpenMenu, isCloseMenu } = menuSlice.actions;