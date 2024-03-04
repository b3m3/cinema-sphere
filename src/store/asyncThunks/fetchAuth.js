import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import jwt from 'jsonwebtoken'

import { BASE_URL } from '../../constants/api'
const API_KEY = process.env.REACT_APP_API_KEY
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET

export const fetchRequestToken = createAsyncThunk(
	'auth/fetchRequestToken',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(
				`${BASE_URL}authentication/token/new?api_key=${API_KEY}`
			)
			return data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const fetchSessionWithLogin = createAsyncThunk(
	'auth/fetchSessionWithLogin',
	async ({ username, password, request_token }, { rejectWithValue }) => {
		try {
			if (username && password && request_token) {
				const { data } = await axios.post(
					`${BASE_URL}authentication/token/validate_with_login?api_key=${API_KEY}`,
					{ username, password, request_token }
				)

				return data
			}
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const fetchSession = createAsyncThunk(
	'auth/fetchSession',
	async ({ request_token }, { rejectWithValue }) => {
		try {
			if (request_token) {
				const { data } = await axios.post(
					`${BASE_URL}authentication/session/new?api_key=${API_KEY}`,
					{ request_token }
				)

				if (data.session_id) {
					const session = jwt.sign(
						{ session_id: data.session_id },
						JWT_SECRET,
						{ expiresIn: '30d' }
					)
					window.localStorage.setItem('session', session)
				}
			}
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const fetchAuth = createAsyncThunk(
	'auth/fetchAuth',
	async (_, { rejectWithValue }) => {
		try {
			const token = window.localStorage.getItem('session');

			if (token) {
				const { session_id } = jwt.verify(token, JWT_SECRET);
				const { data } = await axios.get(
					`${BASE_URL}account?api_key=${API_KEY}&session_id=${session_id}`
				)

				return data
			}
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)