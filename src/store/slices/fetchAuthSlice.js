import { createSlice } from '@reduxjs/toolkit';
import { fetchRequestToken, fetchSessionWithLogin, fetchSession, fetchAuth } from '../asyncThunks/fetchAuth';

const initialState = {
  loading:false,
  status: null,
  token: null,
  validate: null,
  user: {isAuth: false, data: null, loading: false, status: null}
}

const fetchAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = {isAuth: false, data: null, loading: false, status: null};
      window.localStorage.removeItem('session');
    }
  },
  extraReducers: (builder) => {
    builder
			// Create Request Token

			.addCase(fetchRequestToken.pending, state => {
				state.loading = true
				state.token = null
				state.validate = null
				state.status = null
				state.isAuth = false
				state.user = { isAuth: false, data: null, loading: false, status: null }
			})

			.addCase(fetchRequestToken.fulfilled, (state, { payload }) => {
				state.token = payload.request_token
			})

			.addCase(fetchRequestToken.rejected, (state, { payload }) => {
				state.loading = false
				state.status = payload
				state.token = null
				state.user = { isAuth: false, data: null, loading: false, status: null }
			})

			// Create Session With Login

			.addCase(fetchSessionWithLogin.fulfilled, (state, { payload }) => {
				state.validate = payload.request_token
				state.status = null
			})

			.addCase(fetchSessionWithLogin.rejected, (state, { payload }) => {
				state.loading = false
				state.status = payload
				state.validate = null
				state.token = null
				state.user = { isAuth: false, data: null, loading: false, status: null }
			})

			// Create Session

			.addCase(fetchSession.fulfilled, state => {
				state.loading = false
				state.token = null
				state.validate = null
				state.user.isAuth = true
			})

			.addCase(fetchSession.rejected, (state, { payload }) => {
				state.loading = false
				state.status = payload
				state.user = { isAuth: false, data: null, loading: false, status: null }
			})

			// Check Auth

			.addCase(fetchAuth.pending, state => {
				state.user = { isAuth: false, data: null, loading: true, status: null }
			})

			.addCase(fetchAuth.fulfilled, (state, { payload }) => {
				state.user = {
					isAuth: payload ? true : false,
					data: payload,
					loading: false,
					status: null,
				}
			})

			.addCase(fetchAuth.rejected, (state, { payload }) => {
				state.user = {
					isAuth: null,
					data: null,
					loading: false,
					status: payload,
				}
				window.localStorage.removeItem('session')
			})
  }
})

export default fetchAuthSlice.reducer
export const { signOut } = fetchAuthSlice.actions