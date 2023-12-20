import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import { BASE_URL } from '../../constants/api';
const API_KEY = process.env.REACT_APP_API_KEY;
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

const initialState = {
  loading:false,
  status: null,
  token: null,
  validate: null,
  isAuth: false
}

export const createRequestToken = createAsyncThunk(
  'auth/createRequestToken',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(`${BASE_URL}authentication/token/new?api_key=${API_KEY}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const createSessionWithLogin = createAsyncThunk(
  'auth/createSessionWithLogin',
  async ({username, password, request_token}, {rejectWithValue}) => {
    try {
      if (username && password && request_token) {
        const {data} = await axios.post(
          `${BASE_URL}authentication/token/validate_with_login?api_key=${API_KEY}`,
          {username, password, request_token}
        );
  
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const createSession = createAsyncThunk(
  'auth/createSession',
  async ({request_token}, {rejectWithValue}) => {
    try {
      if (request_token) {
        const {data} = await axios.post(
          `${BASE_URL}authentication/session/new?api_key=${API_KEY}`,
          {request_token}
        )

        if (data.session_id) {
          const session = jwt.sign({session_id: data.session_id}, JWT_SECRET, {expiresIn: '30d'});
          window.localStorage.setItem('session', session);
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async(_, {rejectWithValue}) => {
    try {
      const token = window.localStorage.getItem('session');

      if (token) {
        const {session_id} = jwt.verify(token, JWT_SECRET);
        const {data} = await axios.get(`${BASE_URL}account?api_key=${API_KEY}&session_id=${session_id}`)

        return data;
      }
    } catch (error) {
      window.localStorage.removeItem('session');
      return rejectWithValue(error);
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Request Token
    builder.addCase(createRequestToken.pending, (state) => {
      state.loading = true;
      state.token = null;
      state.status = null;
    })
    builder.addCase(createRequestToken.fulfilled, (state, {payload}) => {
      state.token = payload.request_token;
    })
    builder.addCase(createRequestToken.rejected, (state, {payload}) => {
      state.loading = false;
      state.token = null;
      state.status = payload;
    })

    // Create Session With Login
    builder.addCase(createSessionWithLogin.pending, (state) => {
      state.status = null;
    })
    builder.addCase(createSessionWithLogin.fulfilled, (state, {payload}) => {
      state.validate = payload.request_token;
    })
    builder.addCase(createSessionWithLogin.rejected, (state, {payload}) => {
      state.loading = false;
      state.status = payload;
    })

    // Create Session
    builder.addCase(createSession.pending, (state) => {
      state.status = null;
    })
    builder.addCase(createSession.fulfilled, (state) => {
       state.loading = false;
       state.token = null;
       state.validate = null;
    })
    builder.addCase(createSession.rejected, (state, {payload}) => {
      state.loading = false;
      state.status = payload;
    })

    // Check Auth
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(checkAuth.fulfilled, (state, {payload}) => {
       state.isAuth = payload;
    })
    builder.addCase(checkAuth.rejected, (state, {payload}) => {
      state.loading = false;
      state.status = payload;
    })
  }
})

export default authSlice.reducer;