import {createSlice} from "@reduxjs/toolkit";
import {fetchCardData} from "../asyncThunks/fetchCardData";

const initialState = {
  loading: false, 
  status: null, 
  res: null
}

const fetchCardDataSlice = createSlice({
  name: 'cardData',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchBar = {loading: false, status: null, res: null}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardData.pending, (state) => {
        state.loading = true;
        state.res = null;
        state.status = null;
      })
      .addCase(fetchCardData.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.res = payload;
      })
      .addCase(fetchCardData.rejected, (state, {payload}) => {
        payload.message = undefined;
        state.loading = false;
        state.status = payload.message;
      })
  }
})

export default fetchCardDataSlice.reducer;
export const { clearSearch } = fetchCardDataSlice.actions;