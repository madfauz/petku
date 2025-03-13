import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../config/domain";

const initialState = {
  jadwals: null,
  jadwalById: null,
  jadwalsByIdUser: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// ambil cookie dari local storage
function getCookie(name) {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];

    // Hapus spasi di awal
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }

    // Cek apakah nama cookie cocok
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }

  return null; // Jika tidak ditemukan
}

export const getAllJadwals = createAsyncThunk(
  "jadwal-slice/getAllJadwals",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${domain}/jadwal`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getJadwalById = createAsyncThunk(
  "jadwal-slice/getJadwalById",
  async (id_temu, thunkAPI) => {
    try {
      const response = await axios.get(`${domain}/jadwal/${id_temu}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getJadwalsByIdUser = createAsyncThunk(
  "jadwal-slice/getJadwalsByIdUser",
  async (id_user, thunkAPI) => {
    try {
      const response = await axios.get(`${domain}/jadwal/user/${id_user}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postJadwal = createAsyncThunk(
  "jadwal-slice/postJadwal",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${domain}/jadwal`,
        data.id_metode_pembayaran
          ? {
              id_praktek: data.id_praktek,
              id_metode_pembayaran: data.id_metode_pembayaran,
              id_hewan: data.id_hewan,
              waktu_dipilih_pelanggan: data.waktu_dipilih_pelanggan,
            }
          : {
              id_praktek: data.id_praktek,
              id_hewan: data.id_hewan,
              waktu_dipilih_pelanggan: data.waktu_dipilih_pelanggan,
            },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`, // Token di header Authorization
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteJadwal = createAsyncThunk(
  "jadwal-slice/deleteJadwal",
  async (id_temu, thunkAPI) => {
    try {
      const response = await axios.delete(`${domain}/jadwal/${id_temu}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const jadwalSlice = createSlice({
  name: "jadwal-slice",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJadwals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJadwals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jadwals = action.payload;
        state.message = action.payload.message;
      })
      .addCase(getAllJadwals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getJadwalById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJadwalById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jadwalById = action.payload;
      })
      .addCase(getJadwalById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.response.data.errors;
      })
      .addCase(getJadwalsByIdUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJadwalsByIdUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jadwalsByIdUser = action.payload;
      })
      .addCase(getJadwalsByIdUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.response.data.errors;
      })
      .addCase(postJadwal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postJadwal.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(postJadwal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.response.data.errors;
      })
      .addCase(deleteJadwal.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.isError = false;
      })
      .addCase(deleteJadwal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJadwal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.response.data.errors;
      });
  },
});

export const { reset } = jadwalSlice.actions;
export default jadwalSlice.reducer;
