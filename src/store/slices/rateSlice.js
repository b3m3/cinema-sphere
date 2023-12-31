import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import { BASE_URL } from '../../constants/api';

const API_KEY = process.env.REACT_APP_API_KEY;
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

const initialState = {
  loading: false,
  status: null,
  error: false
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

const rateSlice = createSlice({
  name: 'rate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postRate.pending, (state) => {
      state.loading = true;
      state.status = null;
      state.error = false;
    })
    builder.addCase(postRate.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.status = payload.success;
    })
    builder.addCase(postRate.rejected, (state, {payload}) => {
      state.loading = false;
      state.status = payload;
      state.error = true;
    })
  }
})

export default rateSlice.reducer;