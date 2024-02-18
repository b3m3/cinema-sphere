import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import { BASE_URL } from '../../constants/api';

const API_KEY = process.env.REACT_APP_API_KEY;
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

const initialState = {
  post: {loading: false, status: null, error: false},
  rated: {loading: false, status: null, res: null}
}

export const postRate = createAsyncThunk(
  'post/postRate',
  async({category, value, id}, {rejectWithValue}) => {
    try {
      const token = window.localStorage.getItem('session');

      if(category && value && id && token) {
        const {session_id} = jwt.verify(token, JWT_SECRET);

        const {data} = await axios.post(
          `${BASE_URL}${category}/${id}/rating?api_key=${API_KEY}&session_id=${session_id}`,
          {value}
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const getRated = createAsyncThunk(
  'get/getRated',
  async({accountId, category, lang},{rejectWithValue}) => {
    try {
      const token = window.localStorage.getItem('session');

      if(accountId && category && lang && token){
        const {session_id} = jwt.verify(token, JWT_SECRET);
        let results = [];
        let currentPage = 1;
        let totalPages = 1;
        
        while (currentPage <= totalPages) {          
          const {data} = await axios.get(
            `${BASE_URL}account/${accountId}/rated/${category}?api_key=${API_KEY}&session_id=${session_id}&language=${lang}&page=${currentPage}`
          )

          if (data) {
            results = [...results, ...data.results];
            totalPages = data.total_pages;
            currentPage++;
          }
        }

        return results;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

const rateSlice = createSlice({
  name: 'rate',
  initialState,
  reducers: {
    clearRateStates: (state) => {
      state.post.loading = false;
      state.post.status = null;
      state.post.error = false;
    }
  },
  extraReducers: (builder) => {
    // POST
    builder.addCase(postRate.pending, (state) => {
      state.post.loading = true;
      state.post.status = null;
      state.post.error = false;
    })
    builder.addCase(postRate.fulfilled, (state, {payload}) => {
      state.post.loading = false;
      state.post.error = false;
      state.post.status = payload.success;
    })
    builder.addCase(postRate.rejected, (state, {payload}) => {
      state.post.loading = false;
      state.post.status = payload;
      state.post.error = true;
    })

    // GET
    builder.addCase(getRated.pending, (state) => {
      state.rated.loading = true;
      state.rated.status = false;
      state.rated.res = null;
    })
    builder.addCase(getRated.fulfilled, (state, {payload}) => {
      state.rated.loading = false;
      state.rated.status = false;
      state.rated.res = payload;
    })
    builder.addCase(getRated.rejected, (state, {payload}) => {
      state.rated.loading = false;
      state.rated.status = payload;
      state.rated.res = null;
    })
  }
})

export default rateSlice.reducer;
export const { clearRateStates } = rateSlice.actions;