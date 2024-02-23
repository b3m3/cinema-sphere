import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchGenresList = createAsyncThunk(
  'genresList/fetchGenresList',
  async({category, lang}, {rejectWithValue}) => {
    try {
      if (category && lang) {
        const {data} = await axios.get(`${BASE_URL}genre/${category}/list?api_key=${API_KEY}&language=${lang}`);

        return data
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)