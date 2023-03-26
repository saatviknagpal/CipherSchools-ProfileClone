import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: "",
    email: "",
    mobile: "",
    picture: "",
    bio: "",
    linkedIn: "",
    gitHub: "",
    twitter: "",
    instagram: "",
    facebook: "",
    website: "",
    highestEducation: "",
    currently: "",
    interests: [],
    followers: [],
    _id: "",
  },
  reducers: {
    updateDetails: (state, action) => {
      return { ...state, [action.payload.name]: action.payload.value };
    },

    updateInitialState: (state, action) => {
      const { profile } = action.payload;
      for (const key in profile) if (key in state) state[key] = profile[key];

      return state;
    },
  },
});

export default profileSlice.reducer;

export const {
  updateDetails,

  updateInitialState,
} = profileSlice.actions;
