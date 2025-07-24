// src/features/courses/coursesThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/courses`;

// Ambil semua data kursus
export const fetchCourses = createAsyncThunk("courses/fetchAll", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Tambah kursus baru
export const addCourse = createAsyncThunk("courses/add", async (newCourse) => {
  const res = await axios.post(API_URL, newCourse);
  return res.data;
});

// Edit kursus
export const updateCourse = createAsyncThunk(
  "courses/update",
  async ({ id, updatedCourse }) => {
    const res = await axios.put(`${API_URL}/${id}`, updatedCourse);
    return res.data;
  }
);

// Hapus kursus
export const deleteCourse = createAsyncThunk("courses/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});
