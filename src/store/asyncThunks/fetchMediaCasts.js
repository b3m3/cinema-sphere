import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchMediaCasts = createAsyncThunk(
  'MediaCasts/fetchMediaCasts',
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