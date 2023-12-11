import {configureStore} from '@reduxjs/toolkit';

import languageSlice from './slices/languageSlice';

const store = configureStore({
  reducer: {
    lang: languageSlice
  }
})

export default store;