import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../services/api";
import { toast } from "react-toastify";

// Fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users?page=${page}`);
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch users ❌");
      return rejectWithValue(error.response?.data?.message || "Fetch error");
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/users/${userData.id}`,
        userData
      );
      toast.success("User updated successfully ✅");
      return { id: userData.id, data: response.data };
    } catch (error) {
      toast.error("Failed to update user ❌");
      return rejectWithValue(error.response?.data?.message || "Update error");
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/api/users/${id}`);
      toast.success("User deleted successfully 🗑️");
      return id;
    } catch (error) {
      toast.error("Failed to delete user ❌");
      return rejectWithValue(error.response?.data?.message || "Delete error");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, ...action.payload.data }
            : user
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const { setPage } = userSlice.actions;
export default userSlice.reducer;
