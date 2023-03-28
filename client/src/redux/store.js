import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices/updateProfileSlice";
import ProfileReducer from "./slices/fetchProfileSlice";
import followersReducers from "./slices/fetchFollowersSlice";

export const store = configureStore({
  reducer: {
    profileForm: reducer,
    userProfile: ProfileReducer,
    followersReducers,
  },
});
