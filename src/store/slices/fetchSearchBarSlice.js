import {createSlice} from "@reduxjs/toolkit";
import { fetchSearchBar } from "../asyncThunks/fetchSearchBar";
import { extraReducersBody } from "../utils/extraReducersBody";

const initialState = {
  loading: false,
  status: null,
  res: null
}

const fetchSearchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.loading = false;
      state.status = null;
      state.res = null;
    }
  },
  extraReducers: (builder) => {
    extraReducersBody(builder, fetchSearchBar);
  }
})

export default fetchSearchBarSlice.reducer;
export const {clearSearch} = fetchSearchBarSlice.actions;