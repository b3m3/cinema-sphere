import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchSearchBar = createAsyncThunk(
  'searchBar/fetchSearchBar',
  async({category, value, page, lang}, {rejectWithValue}) => {
    try {
      if (category && value && page && lang) {
        const {data} = await axios.get(
          `${BASE_URL}search/${category}?api_key=${API_KEY}&query=${value}&language=${lang}&include_adult=false&page=${page}`
        );

        return data
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)