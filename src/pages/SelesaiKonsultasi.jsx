import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const SelesaiKonsultasi = () => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <Navbar />
      <>
        <div className="w-full h-[80%] py-20 flex justify-center items-center">
          <div className="border-subtle-grey w-[90%] sm:w-[400px] h-[280px] border-[1px] rounded-md px-10 py-8 flex flex-col items-center justify-center gap-4 bg-white shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
            <div className="bg-light-green rounded-full w-12 h-12 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 48 48"
                className="w-[20px] h-[20px]"
              >
                <path
                  fill="currentColor"
                  className="text-white"
                  fillRule="evenodd"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="m4 24l5-5l10 10L39 9l5 5l-25 25z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>

            <h3 className="text-poppins font-bold text-2xl text-center text-dark-grey">
              Pemesanan Selesai
            </h3>
            <h4 className="text-poppins font-normal text-md text-center text-dark-grey">
              Terima kasih sudah melakukan konsultasi
            </h4>
            <button
              className="bg-light-yellow hover:bg-dark-grey duration-300 w-auto px-4 py-2 rounded-md text-white"
              onClick={() => {
                navigate("/");
                window.location.reload();
              }}
            >
              Kembali ke Halaman Utama
            </button>
          </div>
        </div>
      </>
    </>
  );
};

export default SelesaiKonsultasi;
