import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import jwt from 'jsonwebtoken'

import { BASE_URL } from '../../constants/api'

const API_KEY = process.env.REACT_APP_API_KEY
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET

export const postRating = createAsyncThunk(
	'rating/postRating',
	async ({ category, value, id }, { rejectWithValue }) => {
		try {
			const token = window.localStorage.getItem('session')

			if (category && value && id && token) {
				const { session_id } = jwt.verify(token, JWT_SECRET)

				const { data } = await axios.post(
					`${BASE_URL}${category}/${id}/rating?api_key=${API_KEY}&session_id=${session_id}`,
					{ value }
				)

				return data
			}
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const getRating = createAsyncThunk(
	'rating/getRating',
	async ({ accountId, category, lang }, { rejectWithValue }) => {
		try {
			const token = window.localStorage.getItem('session')

			if (accountId && category && lang && token) {
				const { session_id } = jwt.verify(token, JWT_SECRET)
				let results = []
				let currentPage = 1
				let totalPages = 1

				while (currentPage <= totalPages) {
					const { data } = await axios.get(
						`${BASE_URL}account/${accountId}/rated/${category}?api_key=${API_KEY}&session_id=${session_id}&language=${lang}&page=${currentPage}`
					)

					if (data) {
						results = [...results, ...data.results]
						totalPages = data.total_pages
						currentPage++
					}
				}

				return results
			}
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)
