import { createSlice } from "@reduxjs/toolkit";

const followSlice = createSlice({
  name: "follow",
  initialState: {
    items: [],
  },
  reducers: {
    toggleFollow: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleFollow } = followSlice.actions;
export const selectFollowedItems = state => state.follow.items;
export default followSlice.reducer;