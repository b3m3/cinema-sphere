import { createSlice } from "@reduxjs/toolkit";
import { fetchToggleWatchlist, fetchGetTvWatchlist, fetchGetMovieWatchlist } from "../asyncThunks/fetchWatchlist";

const initialState = {
  toggleResults: { loading: false, status: null, res: null },
  tvResults: { loading: false, status: null, res: null },
  movieResults: { loading: false, status: null, res: null }
}

const fetchWatchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // TOGGLE WATCHLIST
      .addCase(fetchToggleWatchlist.pending, (state) => {
        state.toggleResults.loading = true;
        state.toggleResults.status = null;
        state.toggleResults.res = null;
      })
      .addCase(fetchToggleWatchlist.fulfilled, (state, {payload}) => {
        state.toggleResults.loading = false;
        state.toggleResults.status = null;
        state.toggleResults.res = payload;
      })
      .addCase(fetchToggleWatchlist.rejected, (state, {payload}) => {
        state.toggleResults.loading = false;
        state.toggleResults.res = null;
        state.toggleResults.status = payload;
      })

      // GET TV WATCHLIST
      .addCase(fetchGetTvWatchlist.pending, (state) => {
        state.tvResults.loading = true;
        state.tvResults.status = null;
        state.tvResults.res = null;
      })
      .addCase(fetchGetTvWatchlist.fulfilled, (state, {payload}) => {
        state.tvResults.loading = false;
        state.tvResults.status = null;
        state.tvResults.res = payload;
      })
      .addCase(fetchGetTvWatchlist.rejected, (state, {payload}) => {
        state.tvResults.loading = false;
        state.tvResults.res = null;
        state.tvResults.status = payload;
      })

      // GET MOVIE WATCHLIST
      .addCase(fetchGetMovieWatchlist.pending, (state) => {
        state.movieResults.loading = true;
        state.movieResults.status = null;
        state.movieResults.res = null;
      })
      .addCase(fetchGetMovieWatchlist.fulfilled, (state, {payload}) => {
        state.movieResults.loading = false;
        state.movieResults.status = null;
        state.movieResults.res = payload;
      })
      .addCase(fetchGetMovieWatchlist.rejected, (state, {payload}) => {
        state.movieResults.loading = false;
        state.movieResults.res = null;
        state.movieResults.status = payload;
      })
  }
});

export default fetchWatchlistSlice.reducer;