import {createAsyncThunk} from "@reduxjs/toolkit";

import axios from "axios";

import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async({category, season, episode, id, lang}, {rejectWithValue}) => {
    try {
      if (category && id && lang && !season  && !episode) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/videos?api_key=${API_KEY}&language=${lang}`);
        if (Boolean(data?.results?.length)) {
          return data;
        } else {
          const {data} = await axios.get(`${BASE_URL}${category}/${id}/videos?api_key=${API_KEY}&language=en-US`);
          return data;
        }
      }

      if (category && id && lang && season && !episode) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/season/${season}/videos?api_key=${API_KEY}&language=${lang}`);
        if (Boolean(data?.results?.length)) {
          return data;
        } else {
          const {data} = await axios.get(`${BASE_URL}${category}/${id}/season/${season}/videos?api_key=${API_KEY}&language=en-US`);
          return data;
        }
      }

      if (category && id && lang && season && episode) {
        const {data} = await axios.get(`${BASE_URL}${category}/${id}/season/${season}/episode/${episode}/videos?api_key=${API_KEY}&language=${lang}`);
        if (Boolean(data?.results?.length)) {
          return data;
        } else {
          const {data} = await axios.get(`${BASE_URL}${category}/${id}/season/${season}/episode/${episode}/videos?api_key=${API_KEY}&language=en-US`);
          return data;
        }
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)