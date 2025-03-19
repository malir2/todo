import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  login: true,
};

const userSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.login = true;
      state.userData = action.payload.userData;
    },
    logoutUser: (state, action) => {
      state.login = false;
      state.userData = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlices.actions;
export default userSlices.reducer;
