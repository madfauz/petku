import React from "react";

const Jumbotron = ({ data }) => {
  return (
    <div
      className={`${
        data == "hewan" ? "bg-hewan-image" : "bg-praktek-image"
      } bg-cover bg-center w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] bg-cover rounded-xl flex items-end pb-4 pl-4 mt-[12px]`}
    >
      <h3 className="text-white font-bold text-[20px] sm:text-[30px] md:text-[40px]">
        {data == "hewan"
          ? "Kelola Hewan Peliharaan mu"
          : "Kelola Jadwal Praktek mu"}
      </h3>
    </div>
  );
};

export default Jumbotron;
