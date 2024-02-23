import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchImages = createAsyncThunk(
  'images/fetchImages',
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