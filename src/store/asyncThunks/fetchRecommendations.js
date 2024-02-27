import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchRecommendations = createAsyncThunk(
  'Recommendations/fetchRecommendations',
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