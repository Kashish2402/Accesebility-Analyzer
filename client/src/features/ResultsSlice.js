import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../axios/axiosInstance";

export const getResult = createAsyncThunk(
  "result/getResult",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/analyze/get-results/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const analyzeUrl = createAsyncThunk(
  "result/analyzeUrl",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`analyze/analyzeUrl`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Unable to analyze Pdf"
      );
    }
  }
);

export const analyzePdf = createAsyncThunk(
  "result/analyzePdf",
  async (pdf, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`analyze/analyzepdf`, pdf);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Unable to analyze Pdf"
      );
    }
  }
);

export const getUserResults = createAsyncThunk(
  "result/getUserResults",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`analyze/history`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Unable to get user results"
      );
    }
  }
);

export const deleteResults = createAsyncThunk(
  "result/deleteResults",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`analyze/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Unable to get user results"
      );
    }
  }
);
const resultSlice = createSlice({
  name: "result",
  initialState: {
    result: null,
    userResults: [],
    loading: false,
    error: "",
  },
  extraReducers: (builder) =>
    builder
      .addCase(analyzeUrl.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.userResults = [];
      })
      .addCase(analyzeUrl.fulfilled, (state, action) => {
        state.result = action.payload;
        state.loading = false;
        state.userResults = [];
      })
      .addCase(analyzeUrl.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(analyzePdf.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.userResults = [];
      })
      .addCase(analyzePdf.fulfilled, (state, action) => {
        state.result = action.payload;
        state.loading = false;
      })
      .addCase(analyzePdf.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.userResults = [];
      })
      .addCase(getUserResults.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.userResults = [];
      })
      .addCase(getUserResults.fulfilled, (state, action) => {
        state.result = null;
        state.userResults = action.payload;
        state.loading = false;
      })
      .addCase(getUserResults.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getResult.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.userResults = [];
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.result = action.payload;
        state.loading = false;
      })
      .addCase(getResult.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteResults.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(deleteResults.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Deleting from Redux:", action.payload);

        state.userResults = state.userResults.filter(
          (item) => item?._id !== action.payload
        );
      })
      .addCase(deleteResults.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),

  reducers: {
    reset: (state) => {
      state.result = null;
      state.error = "";
      state.loading = false;
      state.userResults = [];
    },
  },
});

export const { reset } = resultSlice.actions;

export default resultSlice.reducer;
