import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../config/domain";

const initialState = {
  animals: null,
  animalsIdPelanggan: null,
  animalsByJenis: null,
  animalsByIdHewan: null,
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

export const getAnimals = createAsyncThunk(
  "animal-slice/getAnimals",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${domain}/animal`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAnimalsByIdPelanggan = createAsyncThunk(
  "animal-slice/getAnimalsByIdPelanggan",
  async (id_user, thunkAPI) => {
    try {
      const response = await axios.get(`${domain}/animal/user/${id_user}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAnimalsByJenis = createAsyncThunk(
  "animal-slice/getAnimalsByJenis",
  async (id_user, thunkAPI) => {
    try {
      const response = await axios.get(`${domain}/animal/jenis/${id_user}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAnimalsByIdHewan = createAsyncThunk(
  "animal-slice/getAnimalsByIdHewan",
  async (id_user, thunkAPI) => {
    try {
      const response = await axios.get(`${domain}/animal/${id_user}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postAnimal = createAsyncThunk(
  "animal-slice/postAnimals",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${domain}/animal`,
        {
          nama: data.nama,
          jenis_hewan: data.jenis_hewan,
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

export const editByIdAnimal = createAsyncThunk(
  "animal-slice/editByIdAnimals",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${domain}/animal/${data.id_hewan}`,
        {
          nama: data.nama,
          jenis_hewan: data.jenis_hewan,
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

export const deleteAnimal = createAsyncThunk(
  "animal-slice/deleteAnimals",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`${domain}/animal/${data.id_hewan}`, {
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

export const animalSlice = createSlice({
  name: "animal-slice",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnimals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnimals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.animals = action.payload;
      })
      .addCase(getAnimals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.response.data.errors;
      })
      .addCase(getAnimalsByIdPelanggan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnimalsByIdPelanggan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.animalsIdPelanggan = action.payload;
      })
      .addCase(getAnimalsByIdPelanggan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.response.data.errors;
      })
      .addCase(getAnimalsByJenis.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnimalsByJenis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.animalsByJenis = action.payload;
      })
      .addCase(getAnimalsByJenis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.response.data.errors;
      })
      .addCase(getAnimalsByIdHewan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnimalsByIdHewan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.animalsByIdHewan = action.payload;
      })
      .addCase(getAnimalsByIdHewan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.response.data.errors;
      })
      .addCase(postAnimal.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(postAnimal.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(postAnimal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.response.data.errors;
      })
      .addCase(editByIdAnimal.fulfilled, (state, action) => {
        state.animals = action.payload.data;
        state.message = action.payload.message;
        state.isSuccess = true;
      })
      .addCase(editByIdAnimal.pending, (state) => {
        state.isLoading = true;
        state.message = "loading...";
      })
      .addCase(editByIdAnimal.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.response.data.errors;
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.user = null;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.isError = false;
      })
      .addCase(deleteAnimal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAnimal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.response.data.errors;
      });
  },
});

export const { reset } = animalSlice.actions;
export default animalSlice.reducer;
