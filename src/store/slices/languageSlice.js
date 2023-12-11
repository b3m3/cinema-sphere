import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: ''
}

const languageSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    changeLang: ( state, {payload} ) => {
      state.lang = payload;
      localStorage.setItem('lang', payload);
    }
  }
})

export default languageSlice.reducer;
export const {changeLang} = languageSlice.actions;