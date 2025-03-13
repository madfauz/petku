import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../config/domain";

const initialState = {
  rekam: null,
  rekamById: null,
  jadwalsById: null,
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

export const getRekamByIdUser = createAsyncThunk(
  "rekam-slice/getAllRekam",
  async (data, thunkAPI) => {
    try {
      let response;

      if (data.role == "pelanggan") {
        response = await axios.get(`${domain}/rekam/pelanggan/${data.id_user}`);
      } else {
        response = await axios.get(`${domain}/rekam/dokter/${data.id_user}`);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRekamByIdPraktek = createAsyncThunk(
  "rekam-slice/getRekamByIdPraktek",
  async (data, thunkAPI) => {
    try {
      let response = await axios.get(
        `${domain}/rekam/praktek/${data.id_praktek}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postRekam = createAsyncThunk(
  "rekam-slice/postRekam",
  async (data, thunkAPI) => {
    try {
      let response;

      if (data.role == "pelanggan") {
        response = await axios.post(
          `${domain}/rekam`,
          {
            id_temu: data.id_temu,
            komentar: data.komentar,
            rating: data.rating,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`, // Token di header Authorization
            },
          }
        );
      } else {
        response = await axios.post(
          `${domain}/rekam/dokter`,
          {
            id_temu: data.id_temu,
            catatan_pasien: data.catatan,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`, // Token di header Authorization
            },
          }
        );
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteRekam = createAsyncThunk(
  "rekam-slice/deleteRekam",
  async (id_rekam, thunkAPI) => {
    try {
      const response = await axios.delete(`${domain}/rekam/${id_rekam}`, {
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

export const rekamSlice = createSlice({
  name: "rekam-slice",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRekamByIdUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRekamByIdUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rekam = action.payload;
        state.message = action.payload.message;
      })
      .addCase(getRekamByIdUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getRekamByIdPraktek.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRekamByIdPraktek.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rekamById = action.payload;
        state.message = action.payload.message;
      })
      .addCase(getRekamByIdPraktek.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(postRekam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postRekam.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(postRekam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteRekam.fulfilled, (state, action) => {
        // state.user = null;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.isError = false;
      })
      .addCase(deleteRekam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRekam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.response.data.errors;
      });
  },
});

export const { reset } = rekamSlice.actions;
export default rekamSlice.reducer;
