import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants/api";
import jwt from "jsonwebtoken";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET

export const fetchToggleWatchlist = createAsyncThunk(
  'watchlist/fetchToggleWatchlist',
  async ({accountId, media_type, media_id, watchlist}, {rejectWithValue}) => {
    try {
      if (accountId && media_type && media_id && watchlist) {
        const token = window.localStorage.getItem('session');
        const { session_id } = jwt.verify(token, JWT_SECRET);

        if (session_id) {
          const { data } = await axios.post(
            `${BASE_URL}account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${session_id}`,
            { media_type, media_id, watchlist }
          );

          console.log(data);
          return data;
        }
      }
    } catch (error) {
      console.log(rejectWithValue(error));
      return rejectWithValue(error)
    }
  }
)

export const fetchGetTvWatchlist = createAsyncThunk(
  'watchlist/fetchGetTvWatchlist',
  async ({accountId, lang}, {rejectWithValue}) => {
    try {
      if (accountId && lang) {
        const token = window.localStorage.getItem('session');
        const {session_id} = jwt.verify(token, JWT_SECRET);

        if (session_id) {
          let allData = [];
          let pageNumber = 1;
          let totalPages = 1;

          while (pageNumber <= totalPages) {
            const {data} = await axios(
              `${BASE_URL}account/${accountId}/watchlist/tv?api_key=${API_KEY}&session_id=${session_id}&page=${pageNumber}&language=${lang}`
            );

            allData = allData.concat(data?.results);
            totalPages = data.total_pages;
            pageNumber++;
          }

          return allData;
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchGetMovieWatchlist = createAsyncThunk(
  'watchlist/fetchGetMovieWatchlist',
  async ({accountId, lang}, {rejectWithValue}) => {
    try {
      if (accountId && lang) {
        const token = window.localStorage.getItem('session');
        const {session_id} = jwt.verify(token, JWT_SECRET);

        if (session_id) {
          let allData = [];
          let pageNumber = 1;
          let totalPages = 1;

          while (pageNumber <= totalPages) {
            const {data} = await axios(
              `${BASE_URL}account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${session_id}&page=${pageNumber}&language=${lang}`
            );

            allData = allData.concat(data?.results);
            totalPages = data.total_pages;
            pageNumber++;
          }

          return allData;
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)
