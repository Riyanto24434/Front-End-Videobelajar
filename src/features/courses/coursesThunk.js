// src/features/courses/coursesThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

// Ambil semua data kursus
export const fetchCourses = createAsyncThunk("courses/fetchAll", async () => {
  const res = await api.get("/courses");
  return res.data;
});

// Tambah kursus baru
export const addCourse = createAsyncThunk("courses/add", async (newCourse) => {
  const res = await api.post("/courses", newCourse);
  return res.data;
});

// Edit kursus
export const updateCourse = createAsyncThunk(
  "courses/update",
  async ({ id, updatedCourse }) => {
    const res = await api.put(`/courses/${id}`, updatedCourse);
    return res.data;
  }
);

// Hapus kursus
export const deleteCourse = createAsyncThunk("courses/delete", async (id) => {
  await api.delete(`/courses/${id}`);
  return id;
});
