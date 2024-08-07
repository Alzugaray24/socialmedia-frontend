import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  user: null,
  token: null,
  localId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.localId = action.payload.localId;
      state.id = action.payload.id;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.localId = null;
      state.id = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
