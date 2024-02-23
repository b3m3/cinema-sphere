import {createSlice} from "@reduxjs/toolkit";
import { fetchSearch } from "../asyncThunks/fetchSearch";
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchSearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchSearch);
  }
})

export default fetchSearchSlice.reducer;