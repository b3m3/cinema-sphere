import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gallery: false
}

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    openGallery: (state) => {
      state.gallery = true
    },
    closeGallery: (state) => {
      state.gallery = false
    }
  }
})

export default gallerySlice.reducer;
export const {openGallery, closeGallery} = gallerySlice.actions;