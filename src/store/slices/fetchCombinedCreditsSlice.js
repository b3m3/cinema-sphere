import {createSlice} from "@reduxjs/toolkit";
import { fetchCombinedCredits } from "../asyncThunks/fetchCombinedCredits";
import {extraReducersBody} from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchCombinedCreditsSlice = createSlice({
  name: 'combinedCreditsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchCombinedCredits);
  }
})

export default fetchCombinedCreditsSlice.reducer;