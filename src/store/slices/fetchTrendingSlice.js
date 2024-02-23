import {createSlice} from "@reduxjs/toolkit";
import { fetchTrending } from "../asyncThunks/fetchTrending";
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchTrendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchTrending);
  }
})

export default fetchTrendingSlice.reducer;