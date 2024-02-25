import {createSlice} from "@reduxjs/toolkit";
import { fetchTrendingCelebs, fetchTrendingMovies, fetchTrendingTvSeries } from "../asyncThunks/fetchTrendingHome";
import { extraReducersTrendingBody } from "../utils/extraReducersBody";

const initialState = {
  celebs: {loading: false, status: null, res: null},
  movies: {loading: false, status: null, res: null},
  tvSeries: {loading: false, status: null, res: null},
}

const fetchTrendingHomeSlice = createSlice({
  name: 'trendingHome',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersTrendingBody(builder, 'celebs', fetchTrendingCelebs);
    extraReducersTrendingBody(builder, 'movies', fetchTrendingMovies);
    extraReducersTrendingBody(builder, 'tvSeries', fetchTrendingTvSeries);
  }
})

export default fetchTrendingHomeSlice.reducer;