import {createSlice} from "@reduxjs/toolkit";
import { fetchReviews } from "../asyncThunks/fetchReviews";
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchReviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchReviews);
  }
})

export default fetchReviewsSlice.reducer;