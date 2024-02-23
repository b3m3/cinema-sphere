import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchTvSeasons = createAsyncThunk(
  'tvSeasons/fetchTvSeasons',
  async ({id, season, lang}, {rejectWithValue}) => {
    try {
      if (id && season && lang) {
        const {data} = await axios.get(
          `${BASE_URL}tv/${id}/season/${season}?api_key=${API_KEY}&language=${lang}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)