import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRekamByIdPraktek } from "../features/rekamSlice";
import { getJadwalsByIdUser } from "../features/jadwalSlice";

const KotakDetailKonsul = ({ data }) => {
  const dispatch = useDispatch();
  const [rekam, setRekam] = useState([]);
  const [dilayani, setDilayani] = useState(0);
  let { rekamById } = useSelector((state) => state.rekam);
  let { jadwalsByIdUser } = useSelector((state) => state.jadwal);

  useEffect(() => {
    dispatch(getRekamByIdPraktek(data?.id_praktek));
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(getJadwalsByIdUser(data?.id_dokter));
    }
  }, [data]);

  useEffect(() => {
    if (rekamById || jadwalsByIdUser) {
      setDilayani(jadwalsByIdUser?.data?.length);
      setRekam(rekamById?.data?.rekam_medis);
    }
  }, [rekamById, jadwalsByIdUser]);

  function handleRating() {
    let rating = 0;
    if (rekam?.length > 0) {
      for (let i = 0; i < rekam.length; i++) {
        if (rekam[i]?.rating) {
          rating = (rating + rekam[i]?.rating) / (i + 1);
        }
      }
    }
    return rating === 0 ? 0 : rating.toFixed(1);
  }

  function capitalizeWords(str = "") {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="h-auto w-full rounded-3xl flex sm:gap-4 flex-col sm:flex-row md:flex-col">
      <div className="flex justify-center items-center rounded-3xl w-[120px] h-[120px] sm:w-[220px] sm:h-[220px] md:w-[280px] lg:w-[300px] lg:h-[300px] p-1 sm:p-2 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <img
          src={
            data?.dokter.url_photo.includes("images/")
              ? `http://localhost:5000/${data?.dokter.url_photo}`
              : data?.dokter.url_photo
          }
          className="w-full h-full rounded-3xl object-cover"
        />
      </div>

      <div>
        <div className="mt-4 p-1 md:p-2 gap-2 flex md:flex-col lg:flex-row align-center justify-between">
          <div>
            <p className="text-xl font-bold font-poppins text-dark-grey">
              {capitalizeWords(data?.dokter.username)}
            </p>
            <p className="text-base font-medium font-poppins text-subtle-grey">
              {data?.dokter.pengalaman} Tahun pengalaman
            </p>
          </div>
          <div className="flex items-center bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:w-[80px] md:h-[40px] lg:w-[80px] lg:h-[60px] px-4 gap-2 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ffbb64"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <span className="font-medium text-dark-grey">
              {handleRating()}{" "}
            </span>
          </div>
        </div>
        <div className="p-2">
          <p className="text-xl font-bold font-poppins text-dark-grey">
            Informasi
          </p>
          <p className="text-base font-medium font-poppins text-subtle-grey">
            Spesialis : {data?.spesialis.join(", ")}
          </p>
          <p className="text-base font-medium font-poppins text-subtle-grey">
            Lokasi : {data?.dokter.nama_klinik}
          </p>
          <p className="text-base font-medium font-poppins text-subtle-grey">
            <span className="text-light-yellow">{dilayani} Pelanggan </span>{" "}
            telah dilayani
          </p>
        </div>
      </div>
    </div>
  );
};

export default KotakDetailKonsul;
