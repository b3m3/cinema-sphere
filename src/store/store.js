import {configureStore} from '@reduxjs/toolkit';

import languageSlice from './slices/languageSlice';
import menuSlice from './slices/menuSlice';
import authSlice from './slices/authSlice';

import fetchCardData from './slices/fetchDataSlice';
import fetchDetails from './slices/fetchDataSlice';
import fetchVideos from './slices/fetchDataSlice';
import fetchImages from './slices/fetchDataSlice';
import fetchGenresList from './slices/fetchDataSlice';
import fetchLinks from './slices/fetchDataSlice';
import fetchEnglishVideo from './slices/fetchDataSlice';
import fetchSearch from './slices/fetchDataSlice';
import fetchMediaCasts from './slices/fetchDataSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    lang: languageSlice,
    menu: menuSlice,
    cardData: fetchCardData,
    details: fetchDetails,
    videos: fetchVideos,
    englishVideo: fetchEnglishVideo,
    images: fetchImages,
    genresList: fetchGenresList,
    links: fetchLinks,
    search: fetchSearch,
    mediaCasts: fetchMediaCasts
  }
})

export default store;