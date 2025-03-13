import React from "react";

const ArtikelPopuler = () => {
  return (
    <div className=" mb-2 ml-4 flex items-center w-[400px] h-24 border-2 bg-white shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] rounded-xl">
      <div className="w-20 h-20 bg-red-400 ml-2 rounded-lg"></div>

      <div className="ml-2 flex flex-col justify-center">
        <h2 className="font-semibold">
          Anabul Bersin Bersin terus? <br /> Gimana Solusinya
        </h2>

        <div className="mt-2">
          <div className="w-[120px] h-6 bg-blue-200 flex items-center justify-center rounded-sm text-sm">
            Rahasia Anabul
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtikelPopuler;
