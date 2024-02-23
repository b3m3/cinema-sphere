import {createSlice} from "@reduxjs/toolkit";
import { fetchKeywords } from "../asyncThunks/fetchKeywords";
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchKeywordsSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchKeywords);
  }
})

export default fetchKeywordsSlice.reducer;