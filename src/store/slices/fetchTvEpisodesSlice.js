import {createSlice} from "@reduxjs/toolkit";
import { fetchTvEpisodes } from "../asyncThunks/fetchTvEpisodes";
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchTvEpisodesSlice = createSlice({
  name: 'tvEpisodes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchTvEpisodes);
  }
})

export default fetchTvEpisodesSlice.reducer;