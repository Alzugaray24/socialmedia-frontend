import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allImages: [],
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.allImages.push(action.payload);
    },
  },
});

export const { setImage } = imageSlice.actions;

export default imageSlice.reducer;
