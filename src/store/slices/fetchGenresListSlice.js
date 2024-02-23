import {createSlice} from "@reduxjs/toolkit";
import { fetchGenresList } from '../asyncThunks/fetchGenresList';
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchGenresListSlice = createSlice({
  name: 'genresList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchGenresList);
  }
})

export default fetchGenresListSlice.reducer;