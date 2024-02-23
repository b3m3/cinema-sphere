import {createSlice} from "@reduxjs/toolkit";
import { fetchTvSeasons } from "../asyncThunks/fetchTvSeasons";
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchTvSeasonsSlice = createSlice({
  name: 'tvSeasons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchTvSeasons);
  }
})

export default fetchTvSeasonsSlice.reducer;