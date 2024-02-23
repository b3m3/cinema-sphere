import {createSlice} from "@reduxjs/toolkit";
import { fetchVideos } from "../asyncThunks/fetchVideos";
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchVideosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchVideos);
  }
})

export default fetchVideosSlice.reducer;