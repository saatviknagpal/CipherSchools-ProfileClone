import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (state) => {
    try {
      const fetchProfileData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/profile/get_profile/${
          state.id === undefined ? localStorage.getItem("id") : state.id
        }`
      );
      const result = await fetchProfileData.data;
      return result;
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  }
);

const fetchProfile = createSlice({
  name: "userProfile",
  initialState: {
    userProfile: {},
    loading: false,
  },

  extraReducers: {
    [getProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [getProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.userProfile = action.payload;
    },
    [getProfile.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default fetchProfile.reducer;
