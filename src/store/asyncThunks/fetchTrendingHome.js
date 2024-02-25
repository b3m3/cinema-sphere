import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchTrendingCelebs = createAsyncThunk(
  'trendingHome/fetchTrendingCelebs',
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

export const fetchTrendingMovies = createAsyncThunk(
  'trendingHome/fetchTrendingMovies',
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

export const fetchTrendingTvSeries = createAsyncThunk(
  'trendingHome/fetchTrendingTvSeries',
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