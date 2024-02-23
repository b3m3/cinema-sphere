import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchEnglishVideo = createAsyncThunk(
  'englishVideo/fetchEnglishVideo',
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