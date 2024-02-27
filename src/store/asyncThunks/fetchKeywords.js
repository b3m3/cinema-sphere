import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchKeywords = createAsyncThunk(
  'Keywords/fetchKeywords',
  async ({category, id}, {rejectWithValue}) => {
    try {
      if (category && id) {
        const {data} = await axios.get(
          `${BASE_URL}${category}/${id}/keywords?api_key=${API_KEY}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)