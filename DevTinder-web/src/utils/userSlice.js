import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user", // Corrected: `name` should be a key-value pair
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload; // Update the state with the user data
    },
    removeUser: (state,action) => {
        // console.log(state,action);
      return null; // Clear the user data
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;