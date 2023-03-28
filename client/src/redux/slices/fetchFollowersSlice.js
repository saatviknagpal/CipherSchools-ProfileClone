import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFollowers = createAsyncThunk(
  "profile/getFollowers",
  async (state) => {
    try {
      const fetchProfileData = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }/followers/get_followers/${localStorage.getItem("id")}`
      );
      const result = await fetchProfileData.data;
      return result;
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  }
);

const fetchFollowers = createSlice({
  name: "userFollowers",
  initialState: {
    userFollowers: {},
    loading: false,
  },

  extraReducers: {
    [getFollowers.pending]: (state, action) => {
      state.loading = true;
    },
    [getFollowers.fulfilled]: (state, action) => {
      state.loading = false;
      state.userFollowers = action.payload;
    },
    [getFollowers.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default fetchFollowers.reducer;
