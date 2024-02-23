import {createSlice} from "@reduxjs/toolkit";
import { fetchSimilar } from "../asyncThunks/fetchSimilar";
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchSimilarSlice = createSlice({
  name: 'similar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchSimilar);
  }
})

export default fetchSimilarSlice.reducer;