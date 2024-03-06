import {configureStore} from '@reduxjs/toolkit';

import languageSlice from './slices/languageSlice';
import menuSlice from './slices/menuSlice';
import fetchAuthSlice from './slices/fetchAuthSlice'
import fetchRatingSlice from './slices/fetchRatingSlice'
import historySlice from './slices/historySlice';

import fetchCardData from './slices/fetchCardDataSlice';
import fetchDetails from './slices/fetchDetailsSlice';
import fetchVideos from './slices/fetchVideosSlice';
import fetchImages from './slices/fetchImagesSlice';
import fetchGenresList from './slices/fetchGenresListSlice';
import fetchLinks from './slices/fetchLinksSlice';
import fetchSearchBar from './slices/fetchSearchBarSlice';
import fetchSearch from './slices/fetchSearchSlice';
import fetchMediaCasts from './slices/fetchMediaCastsSlice';
import fetchCombinedCredits from './slices/fetchCombinedCreditsSlice';
import fetchRecommendations from './slices/fetchRecommendationsSlice';
import fetchSimilar from './slices/fetchSimilarSlice';
import fetchReviews from './slices/fetchReviewsSlice';
import fetchKeywords from './slices/fetchKeywordsSlice';
import fetchTrending from './slices/fetchTrendingSlice';
import fetchTrendingHome from './slices/fetchTrendingHomeSlice';
import fetchDiscover from './slices/fetchDiscoverSlice';
import fetchTvSeasons from './slices/fetchTvSeasonsSlice';
import fetchTvEpisodes from './slices/fetchTvEpisodesSlice';
import fetchWatchlist from "./slices/fetchWatchlistSlice";

const store = configureStore({
	reducer: {
		auth: fetchAuthSlice,
		lang: languageSlice,
		menu: menuSlice,
    watchlist: fetchWatchlist,
		rate: fetchRatingSlice,
		cardData: fetchCardData,
		details: fetchDetails,
		videos: fetchVideos,
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
    trendingHome: fetchTrendingHome,
		history: historySlice,
		discover: fetchDiscover,
		tvSeasons: fetchTvSeasons,
		tvEpisodes: fetchTvEpisodes,
	},
})

export default store;