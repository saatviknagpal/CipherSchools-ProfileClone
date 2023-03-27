import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    picture: "",
    bio: "",
    password: "",
    linkedIn: "",
    github: "",
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
    updateArray: (state, action) => {
      const { type, value } = action.payload;
      state[type].push(value);
    },
    deleteArray: (state, action) => {
      const { type, index } = action.payload;
      state[type].splice(index, 1);
    },
  },
});

export default profileSlice.reducer;

export const { updateDetails, updateArray, deleteArray, updateInitialState } =
  profileSlice.actions;
