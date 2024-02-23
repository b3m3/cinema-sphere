import {createSlice} from "@reduxjs/toolkit";
import { fetchRecommendations} from "../asyncThunks/fetchRecommendations";
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchRecommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchRecommendations);
  }
})

export default fetchRecommendationsSlice.reducer;