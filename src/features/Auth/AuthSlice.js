import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  localId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      console.log("entre");
      console.log(action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.localId = action.payload.localId;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.localId = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
