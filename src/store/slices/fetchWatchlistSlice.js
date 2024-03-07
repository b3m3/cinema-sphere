import { createSlice } from "@reduxjs/toolkit";
import { fetchToggleWatchlist, fetchGetTvWatchlist, fetchGetMovieWatchlist } from "../asyncThunks/fetchWatchlist";

const initialState = {
  toggleResults: { loading: false, status: null, res: null },
  tv: { loading: false, status: null, res: null },
  movie: { loading: false, status: null, res: null }
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
        state.tv.loading = true;
        state.tv.status = null;
        state.tv.res = null;
      })
      .addCase(fetchGetTvWatchlist.fulfilled, (state, {payload}) => {
        state.tv.loading = false;
        state.tv.status = null;
        state.tv.res = payload;
      })
      .addCase(fetchGetTvWatchlist.rejected, (state, {payload}) => {
        state.tv.loading = false;
        state.tv.res = null;
        state.tv.status = payload;
      })

      // GET MOVIE WATCHLIST
      .addCase(fetchGetMovieWatchlist.pending, (state) => {
        state.movie.loading = true;
        state.movie.status = null;
        state.movie.res = null;
      })
      .addCase(fetchGetMovieWatchlist.fulfilled, (state, {payload}) => {
        state.movie.loading = false;
        state.movie.status = null;
        state.movie.res = payload;
      })
      .addCase(fetchGetMovieWatchlist.rejected, (state, {payload}) => {
        state.movie.loading = false;
        state.movie.res = null;
        state.movie.status = payload;
      })
  }
});

export default fetchWatchlistSlice.reducer;