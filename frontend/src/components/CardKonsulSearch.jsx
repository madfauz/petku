import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPractices } from "../features/practiceSlice";

const CardKonsulSearch = ({ data }) => {
  const dispatch = useDispatch();
  const [practices, setPractices] = useState(null);

  useEffect(() => {
    dispatch(getPractices());
  }, []);

  useEffect(() => {
    if (data !== null) {
      setPractices(data);
    }
  }, [data]);

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div
      className="mb-6 w-full flex justify-start gap-4 overflow-x-auto px-[4%] md:px-[7%] xl:px-[10%] py-2"
      style={{ scrollbarWidth: "none" }}
    >
      {practices ? (
        practices.map((practice, index) => (
          <Link
            key={index + 1}
            to={`/konsultasi/${practice?.id_praktek}`}
            className="shadow-md rounded-md bg-white p-4 flex flex-col justify-between gap-4 w-[200px] sm:w-[240px] md:w-[280px]"
          >
            <div className="mx-auto w-[160px] h-40 sm:w-44 sm:h-44 md:w-[240px] md:h-full lg:w-60 lg:h-full overflow-hidden">
              <img
                src={
                  practice.url_photo.includes("images/")
                    ? `http://localhost:5000/${practice?.url_photo}`
                    : practice?.url_photo
                }
                alt={practice.username}
                className="object-contain rounded-md object-top"
              />
            </div>
            <div className="flex gap-1">
              <div className="flex flex-col">
                <div className="bg-subtle-white text-subtle-grey font-bold rounded flex items-center justify-center gap-1 w-[60px] h-[30px] md:w-[80px] md:h-[40px]">
                  <div className="w-auto h-auto">
                    <img
                      className="h-5 w-5"
                      src="https://img.icons8.com/color/48/filled-star--v1.png"
                      alt="filled-star--v1"
                    />
                  </div>
                  <h5 className="font-poppins font-semibold text-[14px]">
                    4.5
                  </h5>
                </div>
                <div className="text-gray-900 font-bold  mb-2 font-poppins font-bold text-sm sm:text-lg md:text-xl line-clamp-1">
                  {capitalizeWords(practice.username)}
                </div>
                <h4 className="text-dark-grey  font-poppins font-semibold text-[10px] md:text-base">
                  Spesialis :{" "}
                  {capitalizeWords(
                    JSON.parse(JSON.parse(practice.spesialis))[0]
                  )}
                </h4>
                {practice.promo ? (
                  <>
                    <div className="text-dark-grey text-lg md:text-xl font-poppins font-bold">
                      Rp. {practice.harga_promo}
                    </div>
                    <div className="text-subtle-grey font-semibold text-sm md:text-md line-through font-poppins font-semibold">
                      Rp. {practice.harga}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-900 text-lg md:text-xl font-poppins font-semibold">
                    Rp. {practice.harga}
                  </div>
                )}
              </div>
            </div>
            <button className="bg-subtle-yellow hover:bg-dark-grey text-white font-bold  rounded font-poppins font-semibold py-2 text-[10px] md:text-lg md:py-2 md:px-4 duration-300">
              Buat Janji Temu
            </button>
          </Link>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default CardKonsulSearch;
