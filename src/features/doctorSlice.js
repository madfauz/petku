import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../config/domain";

const initialState = {
  doctors: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const SearchResults = createAsyncThunk(
  "doctors-slice/SearchResults",
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(
        `${domain}/doctors/search?search_query=${query}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const doctorSlice = createSlice({
  name: "doctors-slice",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(SearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload;
      })
      .addCase(SearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export const { reset } = doctorSlice.actions;
export default doctorSlice.reducer;
