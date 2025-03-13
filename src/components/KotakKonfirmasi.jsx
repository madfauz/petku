import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRekamByIdPraktek } from "../features/rekamSlice";
import { getJadwalsByIdUser } from "../features/jadwalSlice";

const KotakKonfirmasi = ({ data, dateTime }) => {
  const dispatch = useDispatch();
  const [rekam, setRekam] = useState([]);
  const [dilayani, setDilayani] = useState(0);
  let { rekamById } = useSelector((state) => state.rekam);
  let { jadwalsByIdUser } = useSelector((state) => state.jadwal);

  // Rating dan Dilayani
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

  // Tanggal

  const dateMerge = dateTime?.day;
  const dateToString = dateMerge?.toDateString();
  const dateFormat = dateToString?.split(" ").join(" ");

  const time = dateTime?.time;
  let day = dateFormat?.split(" ")[0];
  let month = dateFormat?.split(" ")[1];
  let date = dateFormat?.split(" ")[2];
  let year = dateFormat?.split(" ")[3];

  switch (day) {
    case "Sun":
      day = "Minggu";
      break;
    case "Mon":
      day = "Senin";
      break;
    case "Tue":
      day = "Selasa";
      break;
    case "Wed":
      day = "Rabu";
      break;
    case "Thu":
      day = "Kamis";
      break;
    case "Fri":
      day = "Jumat";
      break;
    default:
      day = "Sabtu";
      break;
  }

  switch (month) {
    case "Jan":
      month = "Januari";
      break;
    case "Feb":
      month = "Februari";
      break;
    case "Mar":
      month = "Maret";
      break;
    case "Apr":
      month = "April";
      break;
    case "May":
      month = "Mei";
      break;
    case "Jun":
      month = "Juni";
      break;
    case "Jul":
      month = "Juli";
      break;
    case "Aug":
      month = "Agustus";
      break;
    case "Sep":
      month = "September";
      break;
    case "Oct":
      month = "Oktober";
      break;
    case "Nov":
      month = "November";
      break;
    default:
      month = "Desember";
      break;
  }

  function capitalizeWords(str = "") {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="h-auto w-full md:w-1/2 rounded-3xl flex sm:gap-4 flex-col sm:flex-row md:flex-col">
      <div className="flex justify-center items-center rounded-3xl w-[120px] h-[120px] sm:w-[220px] sm:h-[220px] md:w-[280px] lg:w-[300px] lg:h-[300px] p-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
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
        <div className="mt-4 p-1 md:p-2 flex md:flex-col lg:flex-row align-center gap-4 lg:gap-8">
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
        <div className="p-1 md:p-2">
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
            <span className="text-light-yellow">{dilayani} Pasien </span> telah
            dilayani
          </p>
        </div>
        <div className="p-1 md:p-2">
          <p className="text-xl font-bold font-poppins text-dark-grey">
            Jadwal yang dipilih
          </p>
          <p className="text-base font-medium font-poppins text-subtle-grey">
            Jam : {`${time} WIB`}
          </p>
          <p className="text-base font-medium font-poppins text-subtle-grey">
            Tanggal : {`${day}, ${date} ${month} ${year}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KotakKonfirmasi;
