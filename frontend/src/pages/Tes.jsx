import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {  } from "../features/practiceSlice";

const Tes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { practices } = useSelector((state) => state.practice);

  useEffect(() => {
    // dispatch(
    //   updatePractice({
    //     id_praktek: "0f7f7eef-d28a-4ce3-b8d1-a7b5e64f32b2",
    //     harga: 35000,
    //     spesialis: "Godzilla",
    //     jadwal_waktu: [
    //       {
    //         day: "Jumat",
    //         times: "21:12, 13:20",
    //       },
    //     ],
    //   })
    // );
  }, []);

  return <div>Buat Tes Doang</div>;
};

export default Tes;
