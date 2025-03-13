import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const KotakDetailRekam = ({ data }) => {
  const rekams = data?.rekam;

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function generateStars(poin) {
    const elements = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= poin) {
        elements.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className={`bi bi-star-fill w-[12px] h-[12px] sm:w-[24px] sm:h-[24px] text-[#ffbb64]`}
            viewBox="0 0 16 16"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        );
      } else {
        elements.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className={`bi bi-star-fill w-[12px] h-[12px] sm:w-[24px] sm:h-[24px] text-subtle-grey`}
            viewBox="0 0 16 16"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        );
      }
    }
    return elements;
  }

  return (
    <section className="w-[76%] h-full mt-[24px] flex flex-col gap-4">
      {/* Tampilan Pasien */}
      {data?.role === "pelanggan"
        ? rekams?.map((rekam, index) => (
            <Link
              to={`/konsultasi/${rekam?.praktek?.id_praktek}/penilaian`}
              key={index}
              state={{ rekam: rekam, role: data?.role }}
              className="flex flex-col md:flex-row shadow-md rounded-md"
            >
              <aside className="basis-full md:basis-2/3 bg-white w-full h-auto flex flex-col gap-2 p-4">
                <div className="border-b-2 pb-2 w-full border-slate-200 flex flex-row-reverse justify-end items-center gap-4">
                  <div className="flex flex-col basis-3/4">
                    <span className="text-dark-grey font-bold font-poppins text-[12px] sm:text-[20px]">
                      {capitalizeWords(rekam?.dokter?.username)}
                    </span>
                    <span className="text-subtle-grey font-semibold font-poppins text-[10px] sm:text-[16px]">
                      Spesialis : {JSON.parse(rekam?.praktek?.spesialis)}
                    </span>
                    <span className="text-subtle-grey font-semibold font-poppins text-[10px] sm:text-[12px]">
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
                  <div className="border-[1px] border-subtle-grey rounded-full overflow-hidden flex items-center justify-center my-auto w-[40px] h-[40px] sm:w-[60px] sm:h-[60px]">
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
                  <span className="h-auto text-subtle-grey font-bold font-poppins text-[12px] sm:text-[16px]">
                    Catatan :
                  </span>
                  <span className="h-auto text-dark-grey font-normal font-poppins text-[12px] sm:text-[16px]">
                    {rekam?.catatan_pasien
                      ? rekam?.catatan_pasien
                      : "Dokter belum menambahkan catatan."}
                  </span>
                </div>
              </aside>
              <aside className="basis-full border-t-2 md:border-t-0 md:basis-1/3 border-l-0 md:border-l-2 border-slate-200 flex flex-col bg-white mx-4 md:my-4 py-4 md:px-4 gap-2">
                <span className="text-subtle-grey text-start md:text-center font-bold font-poppins w-full md:w-full text-[12px] sm:text-[16px]">
                  Penilaian :
                </span>
                {rekam?.rating || rekam?.komentar ? (
                  <>
                    <div className="w-full flex justify-start md:justify-center items-center gap-1 sm:gap-2">
                      {rekam?.rating ? generateStars(rekam?.rating) : ""}
                    </div>
                    <span className="w-auto md:w-[90%] mx-0 md:mx-auto h-auto text-dark-grey font-normal text-start md:text-center font-poppins text-[12px] sm:text-[16px]">
                      {rekam?.komentar ? rekam?.komentar : ""}
                    </span>
                  </>
                ) : (
                  <span
                    key={index}
                    className="w-auto md:w-[90%] mx-0 md:mx-auto h-auto text-dark-grey font-normal text-start md:text-center font-poppins text-[12px] sm:text-[16px]"
                  >
                    Belum masukan penilaian?{" "}
                    <span className="text-light-yellow font-bold hover:text-subtle-grey duration-300">
                      Masukan penilaian
                    </span>
                  </span>
                )}
              </aside>
            </Link>
          ))
        : rekams?.map((rekam, index) => (
            <Link
              to={`/konsultasi/${rekam?.praktek?.id_praktek}/penilaian`}
              key={index}
              state={{ rekam: rekam, role: data?.role }}
              className="flex flex-col md:flex-row shadow-md rounded-md"
            >
              <aside className="basis-full md:basis-2/3 bg-white w-full h-auto flex flex-col gap-2 p-4">
                <div className="border-b-2 pb-2 w-full border-slate-200 flex flex-row-reverse justify-end items-center gap-4">
                  <div className="flex flex-col basis-3/4">
                    <span className="text-dark-grey font-bold font-poppins text-[12px] sm:text-[20px]">
                      {capitalizeWords(rekam?.pelanggan?.username)}
                    </span>
                    <span className="text-subtle-grey font-semibold font-poppins text-[10px] sm:text-[16px]">
                      Spesialis : {JSON.parse(rekam?.praktek?.spesialis)}
                    </span>
                    <span className="text-subtle-grey font-semibold font-poppins text-[10px] sm:text-[12px]">
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
                  <div className="border-[1px] border-subtle-grey rounded-full overflow-hidden flex items-center justify-center my-auto w-[40px] h-[40px] sm:w-[60px] sm:h-[60px]">
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
                  <span className="h-auto text-subtle-grey font-bold font-poppins text-[12px] sm:text-[16px]">
                    Catatan :
                  </span>
                  <span className="h-auto text-dark-grey font-normal font-poppins text-[12px] sm:text-[16px]">
                    {rekam?.catatan_pasien ? (
                      rekam?.catatan_pasien
                    ) : (
                      <span className="w-auto md:w-[90%] h-auto text-dark-grey font-normal font-poppins text-[12px] sm:text-[16px]">
                        Kamu belum memasukan catatan?{" "}
                        <span className="text-light-yellow font-bold hover:text-subtle-grey duration-300">
                          Masukan catatan
                        </span>
                      </span>
                    )}
                  </span>
                </div>
              </aside>
              <aside className="basis-full border-t-2 md:border-t-0 md:basis-1/3 border-l-0 md:border-l-2 border-slate-200 flex flex-col bg-white mx-4 md:my-4 py-4 md:px-4 gap-2">
                <span className="text-subtle-grey text-start md:text-center font-bold font-poppins w-full md:w-full text-[12px] sm:text-[16px]">
                  Penilaian :
                </span>
                {rekam?.rating || rekam?.komentar ? (
                  <>
                    <div className="w-full flex justify-start md:justify-center items-center gap-1 sm:gap-2">
                      {rekam?.rating ? generateStars(rekam?.rating) : ""}
                    </div>
                    <span className="w-auto md:w-[90%] mx-0 md:mx-auto h-auto text-dark-grey font-normal text-start md:text-center font-poppins text-[12px] sm:text-[16px]">
                      {rekam?.komentar ? rekam?.komentar : ""}
                    </span>
                  </>
                ) : (
                  <span className="w-auto md:w-[90%] mx-0 md:mx-auto h-auto text-dark-grey font-normal text-start md:text-center font-poppins text-[12px] sm:text-[16px]">
                    Pelanggan belum memasukan penilaian
                  </span>
                )}
              </aside>
            </Link>
          ))}
    </section>
  );
};

export default KotakDetailRekam;
