import {createSlice} from "@reduxjs/toolkit";
import { fetchDiscover } from '../asyncThunks/fetchDiscover'
import {extraReducersBody} from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchDiscoverSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchDiscover);
  }
})

export default fetchDiscoverSlice.reducer;