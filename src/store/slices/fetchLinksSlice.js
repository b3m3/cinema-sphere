import {createSlice} from "@reduxjs/toolkit";
import { fetchLinks } from "../asyncThunks/fetchLinks";
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchLinksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchLinks);
  }
})

export default fetchLinksSlice.reducer;