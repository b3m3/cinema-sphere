import {createSlice} from "@reduxjs/toolkit";
import { fetchMediaCasts } from "../asyncThunks/fetchMediaCasts";
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchMediaCastsSlice = createSlice({
  name: 'mediaCasts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchMediaCasts);
  }
})

export default fetchMediaCastsSlice.reducer;