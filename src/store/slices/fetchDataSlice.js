import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

import { BASE_URL } from '../../constants/api';

const API_KEY = process.env.REACT_APP_API_KEY;

const initialState = {
  cardData: {loading: false, status: null, res: null},
  details: {loading: false, status: null, res: null},
  videos: {loading: false, status: null, res: null},
  englishVideo: {loading: false, status: null, res: null},
  images: {loading: false, status: null, res: null},
  genresList: {loading: false, status: null, res: null},
  links: {loading: false, status: null, res: null},
  searchBar: {loading: false, status: null, res: null},
  search: {loading: false, status: null, res: null},
  mediaCasts: {loading: false, status: null, res: null},
  recommendations: {loading: false, status: null, res: null},
  similar: {loading: false, status: null, res: null},
  reviews: {loading: false, status: null, res: null},
  keywords: {loading: false, status: null, res: null},
  trending: {loading: false, status: null, res: null},
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

export const fetchEnglishVideo = createAsyncThunk(
  'fetch/fetchEnglishVideo',
  async({category, id}, {rejectWithValue}) => {
    try {
      if (category && id) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/videos?api_key=${API_KEY}&language=en`);

        return data
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchImages = createAsyncThunk(
  'fetch/fetchImages',
  async({category, id}, {rejectWithValue}) => {
    try {
      if (category && id) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/images?api_key=${API_KEY}`);

        return data
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchGenresList = createAsyncThunk(
  'fetch/fetchGenresList',
  async({category, lang}, {rejectWithValue}) => {
    try {
      if (category && lang) {
        const {data} = await axios.get(`${BASE_URL}genre/${category}/list?api_key=${API_KEY}&language=${lang}`);

        return data
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchLinks = createAsyncThunk(
  'fetch/fetchLinks',
  async({category, id}, {rejectWithValue}) => {
    try {
      if (category && id) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/external_ids?api_key=${API_KEY}`);

        return data
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchSearchBar = createAsyncThunk(
  'fetch/fetchSearchBar',
  async({category, value, page, lang}, {rejectWithValue}) => {
    try {
      if (category && value && page && lang) {
        const {data} = await axios.get(
          `${BASE_URL}search/${category}?api_key=${API_KEY}&query=${value}&language=${lang}&include_adult=false&page=${page}`
        );
        
        return data
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchSearch = createAsyncThunk(
  'fetch/fetchSearch',
  async({category, value, page, lang}, {rejectWithValue}) => {
    try {
      if (category && value && page && lang) {
        const {data} = await axios.get(
          `${BASE_URL}search/${category}?api_key=${API_KEY}&query=${value}&language=${lang}&include_adult=false&page=${page}`
        );
        
        return data
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchMediaCasts = createAsyncThunk(
  'fetch/fetchMediaCasts',
  async({category, id, lang}, {rejectWithValue}) => {
    try {
      if (category && id && lang) {
        const {data} = await axios.get(
          `${BASE_URL}${category}/${id}/credits?api_key=${API_KEY}&language=${lang}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchRecommendations = createAsyncThunk(
  'fetch/fetchRecommendations',
  async ({category, id, lang},{rejectWithValue}) => {
    try {
      if (category && id && lang) {
        const {data} = await axios.get(
          `${BASE_URL}${category}/${id}/recommendations?api_key=${API_KEY}&include_adult=false&language=${lang}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchSimilar = createAsyncThunk(
  'fetch/fetchSimilar',
  async ({category, id, lang},{rejectWithValue}) => {
    try {
      if (category && id && lang) {
        const {data} = await axios.get(
          `${BASE_URL}${category}/${id}/similar?api_key=${API_KEY}&include_adult=false&language=${lang}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchReviews = createAsyncThunk(
  'fetch/fetchReviews',
  async ({category, id}, {rejectWithValue}) => {
    try {
      if (category && id) {
        const {data} = await axios.get(
          `${BASE_URL}${category}/${id}/reviews?api_key=${API_KEY}&language=en`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchKeywords = createAsyncThunk(
  'fetch/fetchKeywords',
  async ({category, id}, {rejectWithValue}) => {
    try {
      if (category && id) {
        const {data} = await axios.get(
          `${BASE_URL}${category}/${id}/keywords?api_key=${API_KEY}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchTrending = createAsyncThunk(
  'fetch/fetchTrending',
  async ({category, lang}, {rejectWithValue}) => {
    try {
      if (category && lang) {
        const {data} = await axios.get(
          `${BASE_URL}trending/${category}/day?api_key=${API_KEY}&language=${lang}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

// Function Create Fetch Case
const createFetchCase = (builder, asyncThunk, stateName) => {
  builder.addCase(asyncThunk.pending, (state) => {
    state[`${stateName}`].loading = true;
    state[`${stateName}`].res = null;
    state[`${stateName}`].status = null;
  })
  builder.addCase(asyncThunk.fulfilled, (state, {payload}) => {
    state[`${stateName}`].loading = false;
    state[`${stateName}`].res = payload;
  })
  builder.addCase(asyncThunk.rejected, (state, {payload}) => {
    state[`${stateName}`].loading = false;
    state[`${stateName}`].status = payload.message;
  })
}

const fetchDataSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchBar = {loading: false, status: null, res: null}
    }
  },
  extraReducers: (builder) => {
    createFetchCase(builder, fetchCardData, 'cardData')
    createFetchCase(builder, fetchDetails, 'details')
    createFetchCase(builder, fetchVideos, 'videos')
    createFetchCase(builder, fetchEnglishVideo, 'englishVideo')
    createFetchCase(builder, fetchImages, 'images')
    createFetchCase(builder, fetchGenresList, 'genresList')
    createFetchCase(builder, fetchLinks, 'links')
    createFetchCase(builder, fetchSearchBar, 'searchBar')
    createFetchCase(builder, fetchSearch, 'search')
    createFetchCase(builder, fetchMediaCasts, 'mediaCasts')
    createFetchCase(builder, fetchRecommendations, 'recommendations')
    createFetchCase(builder, fetchSimilar, 'similar')
    createFetchCase(builder, fetchReviews, 'reviews')
    createFetchCase(builder, fetchKeywords, 'keywords')
    createFetchCase(builder, fetchTrending, 'trending')
  }
})

export default fetchDataSlice.reducer;
export const {clearSearch} = fetchDataSlice.actions;