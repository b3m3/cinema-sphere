import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../constants/api";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchTvEpisodes = createAsyncThunk(
  'tvEpisodes/fetchTvEpisodes',
  async ({id, season, episode, lang}, {rejectWithValue}) => {
    try {
      if (id && season && episode && lang) {
        const {data} = await axios.get(
          `${BASE_URL}tv/${id}/season/${season}/episode/${episode}?api_key=${API_KEY}&language=${lang}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)