import {configureStore} from '@reduxjs/toolkit';

import languageSlice from './slices/languageSlice';
import menuSlice from './slices/menuSlice';
import fetchDataSlice from './slices/fetchDataSlice';
import fetchDetails from './slices/fetchDataSlice';
import fetchVideos from './slices/fetchDataSlice';
import fetchImages from './slices/fetchDataSlice';
import fetchGenresList from './slices/fetchDataSlice';
import fetchLinks from './slices/fetchDataSlice';
import fetchEnglishVideo from './slices/fetchDataSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    lang: languageSlice,
    menu: menuSlice,
    data: fetchDataSlice,
    details: fetchDetails,
    videos: fetchVideos,
    englishVideo: fetchEnglishVideo,
    images: fetchImages,
    genresList: fetchGenresList,
    links: fetchLinks
  }
})

export default store;