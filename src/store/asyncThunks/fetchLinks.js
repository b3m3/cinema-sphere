import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchLinks = createAsyncThunk(
  'links/fetchLinks',
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