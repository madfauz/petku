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
import { getUserByCookie } from "../features/userSlice";

const CardJadwal = ({ data: user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { user: checkLogin } = useSelector((state) => state.user);

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    dispatch(getUserByCookie);
  }, []);

  return user?.data.length == 0 ? (
    <></>
  ) : (
    <section
      className="mb-6 w-full flex justify-start gap-4 overflow-x-auto py-2 px-[4%] md:px-[7%] xl:px-[10%]"
      style={{ scrollbarWidth: "none" }}
    >
      {user?.data.map((jadwal, index) => {
        return (
          <div key={index}>
            <Link className="shadow-md rounded-md bg-white w-[320px] sm:w-[400px] h-auto flex flex-col gap-2 p-4">
              <div className="border-b-2 pb-2 border-slate-200 flex justify-between">
                <div className="flex flex-col">
                  <span className="text-dark-grey font-bold font-poppins font-bold text-[16px] sm:text-[20px]">
                    {checkLogin?.role === "dokter"
                      ? capitalizeWords(jadwal.pelanggan.username)
                      : capitalizeWords(jadwal.dokter.username)}
                  </span>
                  <span className="text-subtle-grey font-bold font-poppins font-medium text-[12px] sm:text-[14px]">
                    {`${JSON.parse(jadwal.waktu_dipilih_pelanggan).time} ${
                      JSON.parse(jadwal.waktu_dipilih_pelanggan).date
                    }`}
                  </span>
                </div>
                <div className="border-[1px] border-subtle-grey rounded-md flex items-center justify-center my-auto p-1 h-[max-content] bg-dark-grey">
                  {jadwal.hewan.jenis_hewan == "kucing" ? (
                    <Cat />
                  ) : jadwal.hewan.jenis_hewan == "anjing" ? (
                    <Dog />
                  ) : jadwal.hewan.jenis_hewan == "hamster" ? (
                    <Hamster />
                  ) : jadwal.hewan.jenis_hewan == "burung" ? (
                    <Bird />
                  ) : jadwal.hewan.jenis_hewan == "kambing" ? (
                    <Chameleon />
                  ) : (
                    <Rabbit />
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="basis-1/12 h-auto"
                >
                  <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                    <path
                      fill="currentColor"
                      className="text-dark-grey"
                      d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m-.01 8H11a1 1 0 0 0-.117 1.993L11 12v4.99c0 .52.394.95.9 1.004l.11.006h.49a1 1 0 0 0 .596-1.803L13 16.134V11.01c0-.52-.394-.95-.9-1.004zM12 7a1 1 0 1 0 0 2a1 1 0 0 0 0-2"
                    ></path>
                  </g>
                </svg>
                <span className="basis-8/12 h-auto text-subtle-grey font-normal font-poppins text-[12px] sm:text-[14px]">
                  Pastikan untuk berada di lokasi sesuai jadwal konsultasi
                </span>

                <div className="border-[1px] border-subtle-grey rounded-md flex items-center justify-center my-auto p-2 h-[max-content]">
                  <span className="font-poppins text-subtle-grey font-normal text-[10px] sm:text-[12px] md:text-[14px]">
                    {jadwal.status}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default CardJadwal;
