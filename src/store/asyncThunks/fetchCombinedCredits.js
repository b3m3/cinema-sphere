import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchCombinedCredits = createAsyncThunk(
  'combinedCredits/fetchCombinedCredits',
  async({id, lang}, {rejectWithValue}) => {
    try {
      if (id && lang) {
        const {data} = await axios.get(
          `${BASE_URL}person/${id}/combined_credits?api_key=${API_KEY}&language=${lang}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)