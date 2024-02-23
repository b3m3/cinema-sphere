import {createSlice} from "@reduxjs/toolkit";
import {fetchCardData} from "../asyncThunks/fetchCardData";
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false, 
  status: null, 
  res: null
}

const fetchCardDataSlice = createSlice({
  name: 'cardData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchCardData);
  }
})

export default fetchCardDataSlice.reducer;