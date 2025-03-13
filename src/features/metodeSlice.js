import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../config/domain";

const initialState = {
  metode: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllMetode = createAsyncThunk(
  "metode-slice/getAllMetode",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${domain}/payment`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const metodeSlice = createSlice({
  name: "metode-slice",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMetode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMetode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.metode = action.payload;
        state.message = action.payload.message;
      })
      .addCase(getAllMetode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export const { reset } = metodeSlice.actions;
export default metodeSlice.reducer;
