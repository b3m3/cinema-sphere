import {createSlice} from "@reduxjs/toolkit";
import { fetchImages } from "../asyncThunks/fetchImages";
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchImagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchImages);
  }
})

export default fetchImagesSlice.reducer;