import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import practiceReducer from "../features/practiceSlice";
import animalReducer from "../features/animalSlice";
import jadwalReducer from "../features/jadwalSlice";
import doctorReducer from "../features/doctorSlice";
import metodeReducer from "../features/metodeSlice";
import rekamReducer from "../features/rekamSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    practice: practiceReducer,
    animal: animalReducer,
    jadwal: jadwalReducer,
    doctor: doctorReducer,
    metode: metodeReducer,
    rekam: rekamReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
