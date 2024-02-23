import { createSlice } from '@reduxjs/toolkit'
import { getRating, postRating } from '../asyncThunks/fetchRating'

const initialState = {
	post: { loading: false, status: null, error: false },
	rated: { loading: false, status: null, res: null },
}

const fetchRatingSlice = createSlice({
	name: 'rate',
	initialState,
	reducers: {
		clearRateStates: state => {
			state.post.loading = false
			state.post.status = null
			state.post.error = false
		},
	},
	extraReducers: builder => {
		builder
			// POST
			.addCase(postRating.pending, state => {
				state.post.loading = true
				state.post.status = null
				state.post.error = false
			})
			.addCase(postRating.fulfilled, (state, { payload }) => {
				state.post.loading = false
				state.post.error = false
				state.post.status = payload.success
			})
			.addCase(postRating.rejected, (state, { payload }) => {
				state.post.loading = false
				state.post.status = payload
				state.post.error = true
			})

			// GET
			.addCase(getRating.pending, state => {
				state.rated.loading = true
				state.rated.status = false
				state.rated.res = null
			})
			.addCase(getRating.fulfilled, (state, { payload }) => {
				state.rated.loading = false
				state.rated.status = false
				state.rated.res = payload
			})
			.addCase(getRating.rejected, (state, { payload }) => {
				state.rated.loading = false
				state.rated.status = payload
				state.rated.res = null
			})
	},
})

export default fetchRatingSlice.reducer
export const { clearRateStates } = fetchRatingSlice.actions
