import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../axios/axiosInstance";
import { toast } from "react-hot-toast";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/fetch-current-user`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch User"
      );
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      console.log(userData)
      const response = await axiosInstance.post(`/users/signUp`, userData);
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to register User"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users/login`, userData);
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Unable to login User"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users/logout`);
      toast.success(response?.data?.message || "User logged out successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Unable to logout User"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/users/change-password`,
        userData
      );
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Unable to change password"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (filePath, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/users/update-profile`,
        filePath
      );
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Unable to update profile"
      );
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/auth/fetch-user-details`);
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) =>
    builder
      .addCase(getUser.pending, (state) => {
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthenticated = false;
        // state.error = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.authUser = action.payload;
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.authUser = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.authUser = null;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(changePassword.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),

});

export default authSlice.reducer;
