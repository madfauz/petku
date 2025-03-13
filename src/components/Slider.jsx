import React, { useState } from "react";
import { Link } from "react-router-dom";

const Slider = () => {
  let slides = [
    {
      tag: "#PETCARE",
      url: "https://images.pexels.com/photos/1472999/pexels-photo-1472999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Cek kesehatan hewan peliharaan kamu",
    },
    {
      tag: "#UPTODATE",
      url: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Temukan Informasi Seputar Merawat Hewan",
    },
    {
      tag: "#PETCARE",
      url: "https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Cek kesehatan hewan peliharaan kamu",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(1);

  return (
    <div className=" mt-4 relative group w-[92vw] md:w-[88vw] xl:w-[80vw] h-60 sm:h-80 md:h-[400px]  lg:h-[440px]">
      <div
        style={{
          backgroundImage: `url(${slides[currentIndex].url})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="shadow-xl w-full h-full rounded-2xl duration-500 bg-left-top text-center capitalize flex items-end justify-end"
      >
        <div className="bg-transparent w-1/2 gap-1 px-4 h-full flex flex-col justify-center items-start rounded-2xl sm:px-4 sm:gap-2 md:px-4 md:gap-3 lg:px-6 lg:gap-4">
          <div className="text-white drop-shadow-xl text-start font-poppins font-extrabold text-md sm:text-lg md:text-lg lg:text-1xl xl:text-2xl">
            {slides[currentIndex].tag}
          </div>
          <div className="text-start font-poppins text-white drop-shadow-xl font-medium text-md sm:text-xl md:text-xl lg:text-2xl xl:text-3xl">
            {slides[currentIndex].title}
          </div>
          <Link
            to={"/"}
            className="w-[max-content] bg-light-yellow hover:bg-dark-grey text-white font-medium rounded py-2 px-4 text-sm sm:text-md md:text-md lg:text-md xl:text-lg duration-300"
          >
            Selengkapnya
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 py-4 flex gap-4 justify-center w-full">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrentIndex(i);
              }}
              key={"rounded" + i}
              className={`rounded-md w-6 h-2 cursor-pointer  ${
                i == currentIndex
                  ? "bg-light-brown"
                  : "bg-subtle-grey opacity-[50%]"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
