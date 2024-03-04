import { createSlice } from "@reduxjs/toolkit";
import { fetchWatchlist } from "../asyncThunks/fetchWatchLlst";


const initialState = {
  loading: false,
  status: null
}

const fetchWatchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // TOGGLE WATCHLIST
      .addCase(fetchWatchlist.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(fetchWatchlist.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.status = payload;
      })
      .addCase(fetchWatchlist.rejected, (state, {payload}) => {
        state.loading = false;
        state.status = payload;
      })
  }
});

export default fetchWatchlistSlice.reducer;