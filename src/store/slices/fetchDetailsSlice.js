import {createSlice} from "@reduxjs/toolkit";
import {fetchDetails} from "../asyncThunks/fetchDetails";
import {extraReducersBody} from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchDetailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchDetails);
  }
})

export default fetchDetailsSlice.reducer;