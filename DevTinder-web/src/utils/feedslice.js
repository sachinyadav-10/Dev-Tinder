import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [], // Initialize as an empty array
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // Replace the entire feed
    },
    removeFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload); // Remove a user from the feed
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;