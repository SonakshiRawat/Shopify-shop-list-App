import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const name = createSlice({
  name: "shop",
  initialState: { name: JSON.parse(localStorage.getItem("item")) || [] },
  reducers: {
    actions(state, action) {
      state.name = action.payload.val.items;
      state.name = JSON.parse(localStorage.getItem("item")) || [];
    },
  },
});

const store = configureStore({
  reducer: {
    name: name.reducer,
  },
});
export const { actions } = name.actions;
export default store;
