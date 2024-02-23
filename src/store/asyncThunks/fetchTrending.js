import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchTrending = createAsyncThunk(
  'trending/fetchTrending',
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