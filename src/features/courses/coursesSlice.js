// src/features/courses/coursesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "./coursesThunk";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default coursesSlice.reducer;
