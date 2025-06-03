import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../axios/axiosInstance";

export const analyzeUrl = createAsyncThunk(
  "result/analyzeUrl",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`analyze/analyzeUrl`, data);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      rejectWithValue(
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
      rejectWithValue(
        error?.response?.data?.message || "Unable to analyze Pdf"
      );
    }
  }
);
const resultSlice = createSlice({
  name: "result",
  initialState: {
    result: null,
    loading: false,
    error: "",
  },
  extraReducers: (builder) =>
    builder
      .addCase(analyzeUrl.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(analyzeUrl.fulfilled, (state, action) => {
        state.result = action.payload;
        state.loading = false;
      })
      .addCase(analyzeUrl.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(analyzePdf.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(analyzePdf.fulfilled, (state, action) => {
        state.result = action.payload;
        state.loading = false;
      })
      .addCase(analyzePdf.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),

  reducers: {
    reset: (state) => {
      state.result = null;
      state.error = "";
      state.loading = false;
    },
  },
});

export const { reset } = resultSlice.actions;


export default resultSlice.reducer;
