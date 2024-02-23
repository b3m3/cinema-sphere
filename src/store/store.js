import {configureStore} from '@reduxjs/toolkit';

import languageSlice from './slices/languageSlice';
import menuSlice from './slices/menuSlice';
import fetchAuthSlice from './slices/fetchAuthSlice'
import fetchRatingSlice from './slices/fetchRatingSlice'
import historySlice from './slices/historySlice';

import fetchCardData from './slices/fetchDataSlice';
import fetchDetails from './slices/fetchDataSlice';
import fetchVideos from './slices/fetchDataSlice';
import fetchImages from './slices/fetchDataSlice';
import fetchGenresList from './slices/fetchDataSlice';
import fetchLinks from './slices/fetchDataSlice';
import fetchEnglishVideo from './slices/fetchDataSlice';
import fetchSearchBar from './slices/fetchDataSlice';
import fetchSearch from './slices/fetchDataSlice';
import fetchMediaCasts from './slices/fetchDataSlice';
import fetchCombinedCredits from './slices/fetchDataSlice';
import fetchRecommendations from './slices/fetchDataSlice';
import fetchSimilar from './slices/fetchDataSlice';
import fetchReviews from './slices/fetchDataSlice';
import fetchKeywords from './slices/fetchDataSlice';
import fetchTrending from './slices/fetchDataSlice';
import fetchDiscover from './slices/fetchDataSlice';
import fetchTvSeasons from './slices/fetchDataSlice';
import fetchTvEpisodes from './slices/fetchDataSlice';

// HOME PAGE

import fetchTrendingMovies from './slices/fetchDataSlice';
import fetchTrendingTvSeries from './slices/fetchDataSlice';
import fetchTrendingCelebs from './slices/fetchDataSlice';

const store = configureStore({
	reducer: {
		auth: fetchAuthSlice,
		lang: languageSlice,
		menu: menuSlice,
		rate: fetchRatingSlice,
		cardData: fetchCardData,
		details: fetchDetails,
		videos: fetchVideos,
		englishVideo: fetchEnglishVideo,
		images: fetchImages,
		genresList: fetchGenresList,
		links: fetchLinks,
		searchBar: fetchSearchBar,
		search: fetchSearch,
		mediaCasts: fetchMediaCasts,
		combinedCredits: fetchCombinedCredits,
		recommendations: fetchRecommendations,
		similar: fetchSimilar,
		reviews: fetchReviews,
		keywords: fetchKeywords,
		trending: fetchTrending,
		history: historySlice,
		discover: fetchDiscover,
		tvSeasons: fetchTvSeasons,
		tvEpisodes: fetchTvEpisodes,

		// HOME PAGE

		homeMovies: fetchTrendingMovies,
		homeTvSeries: fetchTrendingTvSeries,
		homeCelebs: fetchTrendingCelebs,
	},
})

export default store;