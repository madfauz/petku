import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Cat,
  Dog,
  Hamster,
  Bird,
  Chameleon,
  Rabbit,
  Fish,
} from "./icon/PetIcon";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const CardRekam = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rekams = data?.rekam;
  const data_user =
    data?.role === "pelanggan" ? data?.rekam?.pelanggan : data?.rekam?.dokter;

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <section
      className="mb-6 w-full flex justify-start gap-4 overflow-x-auto py-2 px-[4%] md:px-[7%] xl:px-[10%]"
      style={{ scrollbarWidth: "none" }}
    >
      {data?.role === "pelanggan"
        ? rekams?.map((rekam, index) => (
            <div key={index}>
              <Link
                to={`/konsultasi/${rekam?.praktek?.id_praktek}/penilaian`}
                key={index}
                state={{ rekam: rekam, role: data?.role }}
                className="shadow-md rounded-md bg-white w-[320px] sm:w-[400px] h-[150px] sm:h-[160px] flex flex-col gap-2 p-4"
              >
                <div className="border-b-2 pb-2 border-slate-200 flex flex-row-reverse justify-end gap-2">
                  <div className="flex flex-col">
                    <span className="text-dark-grey font-bold font-poppins font-bold text-[16px] sm:text-[20px]">
                      {capitalizeWords(rekam?.dokter?.username)}
                    </span>
                    <span className="text-subtle-grey font-bold font-poppins font-medium text-[12px] sm:text-[14px]">
                      {
                        JSON.parse(rekam?.jadwal_temu?.waktu_dipilih_pelanggan)
                          .time
                      }{" "}
                      {
                        JSON.parse(rekam?.jadwal_temu?.waktu_dipilih_pelanggan)
                          .date
                      }
                    </span>
                  </div>
                  <div className="border-[1px] border-subtle-grey rounded-full overflow-hidden flex items-center justify-center my-auto w-12 h-12">
                    <img
                      src={
                        rekam?.dokter?.url_photo.includes("images/")
                          ? `http://localhost:5000/${rekam?.dokter?.url_photo}`
                          : rekam?.dokter?.url_photo
                      }
                      alt="dokter"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between items-start gap-1">
                  <span className="h-auto text-subtle-grey font-bold font-poppins text-[12px] sm:text-[14px]">
                    Catatan :
                  </span>
                  <span className="h-auto text-dark-grey font-normal font-poppins line-clamp-2 text-[12px] sm:text-[14px]">
                    {rekam?.catatan_pasien
                      ? rekam?.catatan_pasien
                      : "Dokter belum menambahkan catatan."}
                  </span>
                </div>
              </Link>
            </div>
          ))
        : rekams?.map((rekam, index) => (
            <div key={index}>
              <Link
                to={`/konsultasi/${rekam?.praktek?.id_praktek}/penilaian`}
                key={index}
                state={{ rekam: rekam, role: data?.role }}
                className="shadow-md rounded-md bg-white w-[320px] sm:w-[400px] h-[150px] sm:h-[160px] flex flex-col gap-2 p-4"
              >
                <div className="border-b-2 pb-2 border-slate-200 flex flex-row-reverse justify-end gap-2">
                  <div className="flex flex-col">
                    <span className="text-dark-grey font-bold font-poppins font-bold text-[16px] sm:text-[20px]">
                      {capitalizeWords(rekam?.pelanggan?.username)}
                    </span>
                    <span className="text-subtle-grey font-bold font-poppins font-medium text-[12px] sm:text-[14px]">
                      {
                        JSON.parse(rekam?.jadwal_temu?.waktu_dipilih_pelanggan)
                          .time
                      }{" "}
                      {
                        JSON.parse(rekam?.jadwal_temu?.waktu_dipilih_pelanggan)
                          .date
                      }
                    </span>
                  </div>
                  <div className="border-[1px] border-subtle-grey rounded-full overflow-hidden flex items-center justify-center my-auto w-12 h-12">
                    <img
                      src={
                        rekam?.pelanggan?.url_photo.includes("images/")
                          ? `http://localhost:5000/${rekam?.pelanggan?.url_photo}`
                          : rekam?.pelanggan?.url_photo
                      }
                      alt="pelanggan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between items-start gap-1">
                  <span className="h-auto text-subtle-grey font-bold font-poppins text-[12px] sm:text-[14px]">
                    Catatan :
                  </span>
                  <span className="h-auto text-dark-grey font-normal font-poppins line-clamp-2 text-[12px] sm:text-[14px]">
                    {rekam?.catatan_pasien
                      ? rekam?.catatan_pasien
                      : "Kamu belum menambahkan catatan."}
                  </span>
                </div>
              </Link>
            </div>
          ))}
    </section>
  );
};

export default CardRekam;
