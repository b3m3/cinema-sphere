import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchCardData = createAsyncThunk(
  'cardData/fetchCardData',
  async ({category, filter, page, lang}, {rejectWithValue}) => {
    try {
      if (category && filter && page && lang) {
        const {data} = await axios.get(
          `${BASE_URL}${category}/${filter}?api_key=${API_KEY}&language=${lang}&page=${page}`
        );

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)