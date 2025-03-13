import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRekam } from "../features/rekamSlice";

const PenilaianAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const data = location.state;

  let { message } = useSelector((state) => state.rekam);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(
    data?.rekam?.rating ? data?.rekam?.rating - 1 : null
  );
  const [comment, setComment] = useState(
    data?.rekam?.komentar ? data?.rekam?.komentar : ""
  );
  const [catatan, setCatatan] = useState(
    data?.rekam?.catatan_pasien ? data?.rekam?.catatan_pasien : ""
  );

  const stars = [0, 1, 2, 3, 4]; // Total 5 bintang

  const handleButton = () => {
    try {
      if (data?.role === "pelanggan") {
        dispatch(
          postRekam({
            id_temu: data?.rekam?.id_temu,
            komentar: comment != "" ? comment : null,
            rating: selectedIndex !== null ? selectedIndex + 1 : null,
            role: data?.role,
          })
        );
      } else {
        dispatch(
          postRekam({
            id_temu: data?.rekam?.id_temu,
            catatan: catatan != "" ? catatan : null,
            role: data?.role,
          })
        );
      }
      navigate("/rekam");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <>
        {data?.role === "pelanggan" ? (
          <section className="px-4 py-16 lg:py-12 w-full h-full flex flex-col justify-center items-center gap-8">
            <h2 className="font-poppins text-dark-grey font-bold text-[20px] md:text-[24px] text-center">
              Berikan Penilaian Kepada Dokter
            </h2>

            <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-4">
              {stars.map((star, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className={`bi bi-star-fill mx-1 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 ${
                    hoveredIndex !== null && index <= hoveredIndex
                      ? "text-[#ffbb64]" // Warna saat di-hover
                      : selectedIndex !== null && index <= selectedIndex
                      ? "text-[#ffbb64]" // Warna saat dipilih
                      : "text-subtle-grey" // Warna default
                  }`}
                  viewBox="0 0 16 16"
                  onMouseEnter={() => setHoveredIndex(index)} // Mengatur indeks terakhir yang di-hover
                  onMouseLeave={() => setHoveredIndex(null)} // Mengatur ulang saat hover keluar
                  onClick={() => setSelectedIndex(index)}
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              ))}
            </div>

            <div className="border-[1px] border-subtle-grey rounded-md overflow-hidden flex items-center justify-center my-auto w-[96%] sm:w-4/5 md:w-2/3 xl:w-1/2 h-[160px] p-2">
              <textarea
                name=""
                id=""
                placeholder="Tulis Penilaian Anda Disini"
                style={{ resize: "none" }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="font-poppins text-[16px] border-none w-full h-full bg-subtle-white p-2"
              ></textarea>
            </div>

            <button
              onClick={handleButton}
              className="bg-light-yellow hover:bg-subtle-grey duration-300 text-white font-poppins font-semibold rounded-md px-16 py-2"
            >
              Kirim
            </button>
          </section>
        ) : (
          <section className="px-4 py-16 lg:py-12 w-full h-full flex flex-col justify-center items-center gap-8">
            <h2 className="font-poppins text-dark-grey font-bold text-[20px] md:text-[24px] text-center">
              Berikan Catatan kepada Pasien
            </h2>
            <div className="border-[1px] border-subtle-grey rounded-md overflow-hidden flex items-center justify-center my-auto w-[96%] sm:w-4/5 md:w-2/3 xl:w-1/2 h-[160px] p-2">
              <textarea
                name=""
                id=""
                placeholder="Tulis Catatan Anda Disini"
                style={{ resize: "none" }}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="font-poppins text-[16px] border-none w-full h-full bg-subtle-white p-2"
              ></textarea>
            </div>

            <button
              onClick={handleButton}
              className="bg-light-yellow hover:bg-subtle-grey duration-300 text-white font-poppins font-semibold rounded-md px-16 py-2"
            >
              Kirim
            </button>
          </section>
        )}
      </>
    </>
  );
};

export default PenilaianAdd;
