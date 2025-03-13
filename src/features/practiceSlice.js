import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../config/domain";

const initialState = {
  practices: null,
  practice: null,
  practicesByIdDokter: null,
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

// cek cookie dan ambil data user tersebut
export const getPractices = createAsyncThunk(
  "practice-slice/getPractices",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${domain}/practices`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPracticeByIdPraktek = createAsyncThunk(
  "practice-slice/getPracticeByIdPraktek",
  async (_, thunkAPI) => {
    try {
      const url = window.location.href; // Mendapatkan URL lengkap
      const parts = url.split("/");
      const id = parts[4]; // Mengambil elemen terakhir setelah '/'

      const response = await axios.get(
        `${domain}/practices/${id.split("%")[0]}`
      );
      return response.data.data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPracticeByIdDokter = createAsyncThunk(
  "practice-slice/getPracticeByIdDokter",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${domain}/practices/${data.id_dokter}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createPractice = createAsyncThunk(
  "practice-slice/createPractice",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${domain}/practices`,
        {
          promo: data.promo,
          harga: data.harga,
          harga_promo: data.harga_promo,
          spesialis: data.spesialis,
          jadwal_waktu: data.jadwal_waktu,
        },
        { headers: { Authorization: `Bearer ${getCookie("token")}` } }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editByIdPraktek = createAsyncThunk(
  "practice-slice/editByIdPraktek",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${domain}/practices/${data.id_praktek}`,
        {
          id_praktek: data.id_praktek,
          harga: data.harga,
          harga_promo: data.harga_promo,
          spesialis: data.spesialis,
          jadwal_waktu: data.jadwal_waktu,
          promo: data.promo,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePraktek = createAsyncThunk(
  "practice-slice/deletePraktek",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${domain}/practices/${data.id_praktek}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const practiceSlice = createSlice({
  name: "practice-slice",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getPractices.fulfilled, (state, action) => {
      state.practices = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(getPractices.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPractices.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.response.data.message;
    });
    builder.addCase(getPracticeByIdPraktek.fulfilled, (state, action) => {
      state.practice = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(getPracticeByIdPraktek.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPracticeByIdPraktek.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.response.data.message;
    });
    builder.addCase(getPracticeByIdDokter.fulfilled, (state, action) => {
      state.practicesByIdDokter = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(getPracticeByIdDokter.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPracticeByIdDokter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.response.data.message;
    });
    builder.addCase(createPractice.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload.message;
    });
    builder.addCase(createPractice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPractice.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.response.data.errors;
    });
    builder.addCase(editByIdPraktek.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload.message;
    });
    builder.addCase(editByIdPraktek.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editByIdPraktek.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.response.data.errors;
    });
    builder.addCase(deletePraktek.fulfilled, (state, action) => {
      state.user = null;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload.message;
      state.isError = false;
    });
    builder.addCase(deletePraktek.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePraktek.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.response.data.errors;
    });
  },
});

export const { reset } = practiceSlice.actions;
export default practiceSlice.reducer;
