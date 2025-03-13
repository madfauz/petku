import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TitleCard from "../components/TitleCard";
import KotakPembayaran from "../components/KotakPembayaran";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByCookie } from "../features/userSlice";

const Pembayaran = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <main className="flex flex-col w-[100%] items-center justify-start mx-auto mb-10">
        <TitleCard>{[true, `/`, "Kembali"]}</TitleCard>
        <KotakPembayaran />
      </main>
    </>
  );
};

export default Pembayaran;
