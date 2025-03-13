import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CatDark,
  DogDark,
  HamsterDark,
  BirdDark,
  ChameleonDark,
  RabbitDark,
} from "./icon/PetIcon";
import { useDispatch, useSelector } from "react-redux";

const KotakListHewan = ({ data, handleDelete }) => {
  const dispatch = useDispatch();
  let { message, isSuccess } = useSelector((state) => state.animal);
  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    if (isSuccess && message == "Hewan sudah terhapus") {
      window.location.reload();
    }
  }, [message, isSuccess]);

  return (
    <div className="mt-4 h-[max-content] p-4 border-[1px] border-subtle-grey bg-subtle-white rounded-xl md:basis-1/2">
      <h3 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-dark-grey">
        Hewan Peliharaan mu
      </h3>
      {data?.length > 0 ? (
        data.map((hewan, index) => (
          <div className="mt-4 flex justify-between gap-2" key={index}>
            <div className="flex w-10/12 border-none rounded-md border-black p-2 justify-between align-center bg-subtle-yellow">
              <div className="w-auto h-full flex align-center">
                <h4 className="my-auto text-md sm:text-lg font-poppins font-medium text-white">
                  {capitalizeWords(hewan.nama)}
                </h4>
              </div>
              <div className="w-auto h-full bg-white rounded-full p-2">
                {hewan.jenis_hewan == "kucing" ? (
                  <CatDark />
                ) : hewan.jenis_hewan == "anjing" ? (
                  <DogDark />
                ) : hewan.jenis_hewan == "hamster" ? (
                  <HamsterDark />
                ) : hewan.jenis_hewan == "burung" ? (
                  <BirdDark />
                ) : hewan.jenis_hewan == "kelinci" ? (
                  <RabbitDark />
                ) : (
                  <ChameleonDark />
                )}
              </div>
            </div>
            {/* di dalam state link kirim id hewan yang mau di edit */}
            <Link to="/hewan/edit" state={hewan} className="my-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path
                  fill="currentColor"
                  d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z"
                ></path>
                <path
                  fill="currentColor"
                  d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2z"
                ></path>
              </svg>
            </Link>
            <Link
              className="my-auto"
              onClick={() => handleDelete(hewan.id_hewan, hewan.nama)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path
                  fill="currentColor"
                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                ></path>
              </svg>
            </Link>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default KotakListHewan;
