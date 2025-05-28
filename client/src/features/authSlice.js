import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../axios/axiosInstance";
import { toast } from "react-hot-toast";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { isRejectedWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/fetch-current-user`);
      return response.data;
    } catch (error) {
      return isRejectedWithValue(
        error.response?.data?.message || "Unable to fetch User"
      );
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/users/sigUp`, userData);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to register User"
      );
    }
  }
);

export const login=createAsyncThunk("auth/login",async(userData,{rejectWithValue})=>{
    try {
        const response=await axiosInstance.post(`/users/login`,userData)
        toast.success(response?.data?.message)
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || "Unable to login User")
    }
})

export const logout=createAsyncThunk("auth/logout",async(_,{rejectWithValue})=>{
    try {
        const response=await axiosInstance.post(`/users/logout`)
            toast.success(response?.data?.message || "User logged out successfully")
            return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || "Unable to logout User")
    }
})

export const changePassword=createAsyncThunk("auth/changePassword",async(userData,{rejectWithValue})=>{
    try {
        const response=await axiosInstance.patch(`/users/change-password`,userData)
        toast.success(response?.data?.message)
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || "Unable to change password")
    }
})

export const updateProfile=createAsyncThunk("auth/updateProfile",async(filePath,{rejectWithValue})=>{
    try {
        const response=await axiosInstance.patch(`/users/update-profile`,filePath)
        toast.success(response?.data?.message)
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || "Unable to update profile")
    }
})

export const fetchUserDetails=createAsyncThunk("/auth/fetchUserDetails",async(_,{rejectWithValue})=>{
    try {
        const response=await axiosInstance.get(`/auth/fetch-user-details`)
        toast.success(response?.data?.message)
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isAuthenticated: false,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingUserDetails: false,
    isImageUpdating: false,
    error: null,
  },

//   extraReducers: (builder)=>{},
  reducers: {},
});

export default authSlice.reducer;
