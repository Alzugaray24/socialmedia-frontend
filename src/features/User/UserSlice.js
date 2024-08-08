import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileImage: null,
  imageCamara: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setImageProfile: (state, action) => {
      state.profileImage = action.payload;
    },
    setImageCamara: (state, action) => {
      state.imageCamara = action.payload;
    },
  },
});

export const { setImageProfile, setImageCamara } = userSlice.actions;

export default userSlice.reducer;
