import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchDiscover = createAsyncThunk(
  'discover/fetchDiscover',
  async ({category, filters, lang, page}, {rejectWithValue}) => {
    try {
      if (category && filters && lang && page) {
        const {data} = await axios.get(
          `${BASE_URL}discover/${category}?api_key=${API_KEY}${filters}&language=${lang}&page=${page}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)