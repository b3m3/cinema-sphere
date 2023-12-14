import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

import { BASE_URL } from '../../constants/api';

const API_KEY = process.env.REACT_APP_API_KEY;

const initialState = {
  cardData: {loading: false, status: null, res: null},
  details: {loading: false, status: null, res: null},
  videos: {loading: false, status: null, res: null},
}

export const fetchCardData = createAsyncThunk(
  'fetch/fetchCardData',
  async ({category, filter, page, lang}, {rejectWithValue}) => {
    try {
      if (category && filter && page && lang) {
        const {data} = await axios.get(
          `${BASE_URL}${category}/${filter}?api_key=${API_KEY}&language=${lang}&page=${page}`
        );
  
        return data
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchDetails = createAsyncThunk(
  'fetch/fetchDetails',
  async({category, id, lang}, {rejectWithValue}) => {
    try {
      if (category && id && lang) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}?api_key=${API_KEY}&language=${lang}`);

        return data
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchVideos = createAsyncThunk(
  'fetch/fetchVideos',
  async({category, id, lang}, {rejectWithValue}) => {
    try {
      if (category && id && lang) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/videos?api_key=${API_KEY}&language=${lang}`);

        return data
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const fetchDataSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchCardData
    builder.addCase(fetchCardData.pending, (state) => {
      state.cardData.loading = true;
      state.cardData.res = null;
      state.cardData.status = null;
    })
    builder.addCase(fetchCardData.fulfilled, (state, {payload}) => {
      state.cardData.loading = false;
      state.cardData.res = payload;
    })
    builder.addCase(fetchCardData.rejected, (state, {payload}) => {
      state.cardData.loading = false;
      state.cardData.status = payload.message;
    })

    // fetchDetails
    builder.addCase(fetchDetails.pending, (state) => {
      state.details.loading = true;
      state.details.res = null;
      state.details.status = null;
    })
    builder.addCase(fetchDetails.fulfilled, (state, {payload}) => {
      state.details.loading = false;
      state.details.res = payload;
    })
    builder.addCase(fetchDetails.rejected, (state, {payload}) => {
      state.details.loading = false;
      state.details.status = payload.message;
    })

    // fetchVideos
    builder.addCase(fetchVideos.pending, (state) => {
      state.videos.loading = true;
      state.videos.res = null;
      state.videos.status = null;
    })
    builder.addCase(fetchVideos.fulfilled, (state, {payload}) => {
      state.videos.loading = false;
      state.videos.res = payload;
    })
    builder.addCase(fetchVideos.rejected, (state, {payload}) => {
      state.videos.loading = false;
      state.videos.status = payload.message;
    })
  }
})

export default fetchDataSlice.reducer;