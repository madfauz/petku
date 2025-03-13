import React, { useEffect, useState } from "react";

const KotakPembayaran = () => {
  return (
    <section className="h-[max-content] w-[92%] md:w-[86%] xl:w-[80%] flex flex-col">
      <aside className="cursor-pointer bg-white hover:shadow-md duration-300 rounded-md mx-4 my-6">
        <h4 className="p-2 font-poppins font-light text-[12px] sm:text-[16px] md:text-[20px]">
          Minggu, 25 Desember 2024
        </h4>
        <div className="p-2 border-t-[1px] border-black flex justify-between items-center">
          <div className="flex gap-2 sm:gap-4 items-center">
            <img
              src="https://images.pexels.com/photos/14928820/pexels-photo-14928820.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              className="w-[40px] h-[40px] sm:w-[52px] sm:h-[52px] md:w-[68px] md:h-[68px] object-cover rounded-full"
            />
            <div className="flex flex-col justify-center">
              <h5 className="font-poppins font-semibold text-[16px] sm:text-[20px] md:text-[24px] h-[max-content]">
                Drs. Dian Aryani
              </h5>
              <h6 className="font-poppins font-normal text-[12px] sm:text-[14px] md:text-[16px]">
                Spesialis : Kucing
              </h6>
            </div>
          </div>
          <div className="flex flex-col items-end gap-0 sm:gap-1">
            <h5 className="font-poppins font-bold text-[16px] sm:text-[20px] md:text-[24px]">
              Rp. 87.000
            </h5>
            <div className="font-poppins bg-yellow-500 font-light text-white text-[8px] sm:text-[10px] md:text-[12px] px-2 py-1 rounded-md">
              Belum dibayar
            </div>
          </div>
        </div>
      </aside>
      <aside className="cursor-pointer bg-white hover:shadow-md duration-300 rounded-md mx-4 my-6">
        <h4 className="p-2 font-poppins font-light text-[12px] sm:text-[16px] md:text-[20px]">
          Rabu, 25 November 2024
        </h4>
        <div className="p-2 border-t-[1px] border-black flex justify-between items-center">
          <div className="flex gap-2 sm:gap-4 items-center">
            <img
              src="https://images.pexels.com/photos/14928820/pexels-photo-14928820.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              className="w-[40px] h-[40px] sm:w-[52px] sm:h-[52px] md:w-[68px] md:h-[68px] object-cover rounded-full"
            />
            <div className="flex flex-col justify-center">
              <h5 className="font-poppins font-semibold text-[16px] sm:text-[20px] md:text-[24px] h-[max-content]">
                Drs. Dian Aryani
              </h5>
              <h6 className="font-poppins font-normal text-[12px] sm:text-[14px] md:text-[16px]">
                Spesialis : Kucing
              </h6>
            </div>
          </div>
          <div className="flex flex-col items-end gap-0 sm:gap-1">
            <h5 className="font-poppins font-bold text-[16px] sm:text-[20px] md:text-[24px]">
              Rp. 120.000
            </h5>
            <div className="font-poppins bg-green-600 font-light text-white text-[8px] sm:text-[10px] md:text-[12px] px-2 py-1 rounded-md">
              Sudah Bayar
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default KotakPembayaran;
