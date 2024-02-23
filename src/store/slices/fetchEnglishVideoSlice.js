import {createSlice} from "@reduxjs/toolkit";
import {fetchEnglishVideo} from "../asyncThunks/fetchEnglishVideo";
import {extraReducersBody} from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchEnglishVideoSlice = createSlice({
  name: 'englishVideo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchEnglishVideo);
  }
})

export default fetchEnglishVideoSlice.reducer;