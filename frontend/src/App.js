import "./App.css";
import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Konsultasi from "./pages/Konsultasi";
import Forum from "./pages/Forum";
import DetailKonsultasi from "./pages/DetailKonsultasi";
import KonfirmasiKonsultasi from "./pages/KonfirmasiKonsultasi";
import SelesaiKonsultasi from "./pages/SelesaiKonsultasi";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Setting from "./pages/Setting";
import Hewan from "./pages/Hewan";
import HewanEdit from "./pages/HewanEdit";
import Praktek from "./pages/Praktek";
import PraktekEdit from "./pages/PraktekEdit";
import PenilaianAdd from "./pages/PenilaianAdd";
import PenilaianDetail from "./pages/PenilaianDetail";
import Rekam from "./pages/Rekam";
import Pembayaran from "./pages/Pembayaran";
import Tes from "./pages/Tes";

function App() {
  return (
    <div className="w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/konsultasi" element={<Konsultasi />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/konsultasi/:id" element={<DetailKonsultasi />} />
          <Route
            path="/konsultasi/:id/konfirmasi"
            element={<KonfirmasiKonsultasi />}
          />
          <Route path="/konsultasi/:id/penilaian" element={<PenilaianAdd />} />
          <Route
            path="/konsultasi/:id/selesai"
            element={<SelesaiKonsultasi />}
          />
          <Route
            path="/konsultasi/:id/penilaian-detail"
            element={<PenilaianDetail />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/hewan" element={<Hewan />} />
          <Route path="/hewan/edit" element={<HewanEdit />} />
          <Route path="/praktek" element={<Praktek />} />
          <Route path="/praktek/edit" element={<PraktekEdit />} />
          <Route path="/rekam" element={<Rekam />} />
          <Route path="/pembayaran" element={<Pembayaran />} />

          <Route path="/tes" element={<Tes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
