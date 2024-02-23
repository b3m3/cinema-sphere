import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

import { BASE_URL } from '../../constants/api';

const API_KEY = process.env.REACT_APP_API_KEY;

const initialState = {
  // cardData: {loading: false, status: null, res: null},
  // details: {loading: false, status: null, res: null},
  videos: {loading: false, status: null, res: null},
  englishVideo: {loading: false, status: null, res: null},
  images: {loading: false, status: null, res: null},
  genresList: {loading: false, status: null, res: null},
  links: {loading: false, status: null, res: null},
  searchBar: {loading: false, status: null, res: null},
  search: {loading: false, status: null, res: null},
  mediaCasts: {loading: false, status: null, res: null},
  combinedCredits: {loading: false, status: null, res: null},
  recommendations: {loading: false, status: null, res: null},
  similar: {loading: false, status: null, res: null},
  reviews: {loading: false, status: null, res: null},
  keywords: {loading: false, status: null, res: null},
  trending: {loading: false, status: null, res: null},
  discover: {loading: false, status: null, res: null},
  tvSeasons: {loading: false, status: null, res: null},
  tvEpisodes: {loading: false, status: null, res: null},

  // HOME PAGE
  homeMovies: {loading: false, status: null, res: null},
  homeCelebs: {loading: false, status: null, res: null},
  homeTvSeries: {loading: false, status: null, res: null},
}

// export const fetchCardData = createAsyncThunk(
//   'fetch/fetchCardData',
//   async ({category, filter, page, lang}, {rejectWithValue}) => {
//     try {
//       if (category && filter && page && lang) {
//         const {data} = await axios.get(
//           `${BASE_URL}${category}/${filter}?api_key=${API_KEY}&language=${lang}&page=${page}`
//         );
//
//         return data
//       }
//     } catch (error) {
//       return rejectWithValue(error)
//     }
//   }
// )

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
  async({category, season, episode, id, lang}, {rejectWithValue}) => {
    try {
      if (category && id && lang && !season  && !episode) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/videos?api_key=${API_KEY}&language=${lang}`);

        return data
      }

      if (category && id && lang && season && !episode) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/season/${season}/videos?api_key=${API_KEY}&language=${lang}`);

        return data
      }

      if (category && id && lang && season && episode) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/season/${season}/episode/${episode}/videos?api_key=${API_KEY}&language=${lang}`);

        return data
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchEnglishVideo = createAsyncThunk(
  'fetch/fetchEnglishVideo',
  async({category, season, episode, id}, {rejectWithValue}) => {
    try {
      if (category && id && !season && !episode) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/videos?api_key=${API_KEY}&language=en`);

        return data
      }

      if (category && id && season && !episode) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/season/${season}/videos?api_key=${API_KEY}&language=en`);

        return data
      }

      if (category && id && season && episode) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/season/${season}/episode/${episode}/videos?api_key=${API_KEY}&language=en`);

        return data
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchImages = createAsyncThunk(
  'fetch/fetchImages',
  async({category, season, episode, id}, {rejectWithValue}) => {
    try {
      if (category && id && !season && !episode) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/images?api_key=${API_KEY}`);

        return data;
      }

      if (category && id && season && !episode) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/season/${season}/images?api_key=${API_KEY}`);

        return data;
      }

      if (category && id && season && episode) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/season/${season}/episode/${episode}/images?api_key=${API_KEY}`);

        return data;
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
          `${BASE_URL}search/${category}?api_key=${API_KEY}&query=${value}&language=${lang}&page=${page}`
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
  async({category, season, episode, id, lang}, {rejectWithValue}) => {
    try {
      if (category && id && lang && !season && !episode) {
        const {data} = await axios.get(
          `${BASE_URL}${category}/${id}/credits?api_key=${API_KEY}&language=${lang}`
        )

        return data;
      }

      if (category && id && lang && season && !episode) {
        const {data} = await axios.get(
          `${BASE_URL}${category}/${id}/season/${season}/credits?api_key=${API_KEY}&language=${lang}`
        )

        return data;
      }

      if (category && id && lang && season && episode) {
        const {data} = await axios.get(
          `${BASE_URL}${category}/${id}/season/${season}/episode/${episode}/credits?api_key=${API_KEY}&language=${lang}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchCombinedCredits = createAsyncThunk(
  'fetch/fetchCombinedCredits',
  async({id, lang}, {rejectWithValue}) => {
    try {
      if (id && lang) {
        const {data} = await axios.get(
          `${BASE_URL}person/${id}/combined_credits?api_key=${API_KEY}&language=${lang}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error)
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

export const fetchDiscover = createAsyncThunk(
  'fetch/fetchDiscover',
  async ({category, filters, lang, page}, {rejectWithValue}) => {
    try {
      if (category && filters && lang && page) {
        const {data} = await axios.get(
          `${BASE_URL}discover/${category}?api_key=${API_KEY}${filters}&language=${lang}&page=${page}`
        )
  
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchTvSeasons = createAsyncThunk(
  'fetch/fetchTvSeasons',
  async ({id, season, lang}, {rejectWithValue}) => {
    try {
      if (id && season && lang) {
        const {data} = await axios.get(
          `${BASE_URL}tv/${id}/season/${season}?api_key=${API_KEY}&language=${lang}`
        )
  
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchTvEpisodes = createAsyncThunk(
  'fetch/fetchTvEpisodes',
  async ({id, season, episode, lang}, {rejectWithValue}) => {
    try {
      if (id && season && episode && lang) {
        const {data} = await axios.get(
          `${BASE_URL}tv/${id}/season/${season}/episode/${episode}?api_key=${API_KEY}&language=${lang}`
        )
  
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

// HOME PAGE DATA

export const fetchTrendingMovies = createAsyncThunk(
  'fetch/fetchTrendingMovies',
  async ({lang}, {rejectWithValue}) => {
    try {
      if (lang) {
        const {data} = await axios.get(
          `${BASE_URL}trending/movie/day?api_key=${API_KEY}&language=${lang}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchTrendingCelebs = createAsyncThunk(
  'fetch/fetchTrendingCelebs',
  async ({lang}, {rejectWithValue}) => {
    try {
      if (lang) {
        const {data} = await axios.get(
          `${BASE_URL}trending/person/day?api_key=${API_KEY}&language=${lang}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchTrendingTvSeries = createAsyncThunk(
  'fetch/fetchTrendingTvSeries',
  async ({lang}, {rejectWithValue}) => {
    try {
      if (lang) {
        const {data} = await axios.get(
          `${BASE_URL}trending/tv/day?api_key=${API_KEY}&language=${lang}`
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
    // createFetchCase(builder, fetchCardData, 'cardData')
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
    createFetchCase(builder, fetchDiscover, 'discover')
    createFetchCase(builder, fetchCombinedCredits, 'combinedCredits')
    createFetchCase(builder, fetchTvSeasons, 'tvSeasons')
    createFetchCase(builder, fetchTvEpisodes, 'tvEpisodes')
    
    // HOME PAGE
    createFetchCase(builder, fetchTrendingMovies, 'homeMovies')
    createFetchCase(builder, fetchTrendingCelebs, 'homeCelebs')
    createFetchCase(builder, fetchTrendingTvSeries, 'homeTvSeries')
  }
})

export default fetchDataSlice.reducer;
export const {clearSearch} = fetchDataSlice.actions;