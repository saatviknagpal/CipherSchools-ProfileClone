import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices/updateProfileSlice";
import ProfileReducer from "./slices/fetchProfileSlice";

export const store = configureStore({
  reducer: {
    profileForm: reducer,
    userProfile: ProfileReducer,
  },
});
