import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../config/domain";

const initialState = {
  user: null,
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
export const getUserByCookie = createAsyncThunk(
  "user-slice/VerifyCookie",
  async (_, thunkAPI) => {
    try {
      const cookie = getCookie("token");
      const response = await axios.get(`${domain}/users`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "user-slice/login",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${domain}/login`,
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "user-slice/logout",
  async (_, thunkAPI) => {
    try {
      const cookie = getCookie("token");
      const response = await axios.get(`${domain}/logout`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editById = createAsyncThunk(
  "user-slice/editById",
  async (data, thunkAPI) => {
    try {
      let response;
      const cookie = getCookie("token");

      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("kontak", data.kontak);
      formData.append("alamat", data.alamat);

      if (data.url_photo) {
        formData.append("image", data.url_photo);
      }

      if (data.role == "dokter") {
        formData.append("pengalaman", data.pengalaman);
        formData.append("nama_klinik", data.nama_klinik);
      }

      if (data.role === "pelanggan") {
        response = await axios.patch(
          `${domain}/customers/${data.id_user}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else if (data.role === "dokter") {
        response = await axios.patch(
          `${domain}/doctors/${data.id_user}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
              "Content-Type": "multipart/form-data",
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

export const userSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getUserByCookie.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(getUserByCookie.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserByCookie.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.response.data.message;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload.message;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.message = "loading...";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.response.data.errors;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload.message;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.response.data.message;
    });
    builder.addCase(editById.fulfilled, (state, action) => {
      window.location.reload();
      state.user = action.payload.data;
      state.message = action.payload.message;
      state.isSuccess = true;
    });
    builder.addCase(editById.pending, (state) => {
      state.isLoading = true;
      state.message = "loading...";
    });
    builder.addCase(editById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload?.response.data.errors;
    });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
