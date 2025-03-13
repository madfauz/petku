import React from "react";
import { Link } from "react-router-dom";

const ArtikelTerbaru = () => {
  return (
    <div className="px-4 pt-8">
      <div
        className="w-56 h-[350px] bg-white rounded-xl 
         shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]
          r"
      >
        <div className="flex justify-center items-cente">
          <div className=" w-48 h-40 bg-red-600 mt-2 rounded-xl"></div>
        </div>

        <h2 className="px-4 pt-4 font-semibold">
          8 Penyakit Hewan yang berbahaya
        </h2>
        <div className=" w-28 h-8 bg-blue-200 mx-4 mt-2 flex justify-center items-center rounded-lg">
          <h2 className=" text-[14px] font-medium">Penyakit Hewan</h2>
        </div>
        <p className="px-4 pt-4 text-[12px]">
          Sendi dan tulang memiliki peran krusial dalam kemampuan fisik tubuh{" "}
        </p>
      </div>
    </div>
  );
};

export default ArtikelTerbaru;
