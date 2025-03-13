import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRekamByIdPraktek } from "../features/rekamSlice";

const KotakComment = () => {
  const dispatch = useDispatch();

  let { rekamById } = useSelector((state) => state.rekam);
  const rekamComment = rekamById?.data?.rekam_medis;
  const rekamCommentFilter = rekamComment?.filter((rekam) => {
    return rekam.tanggal_komentar !== null;
  });

  const url = window.location.href;
  const id_praktek = url.split("/").pop();

  useEffect(() => {
    dispatch(getRekamByIdPraktek({ id_praktek: id_praktek }));
  }, []);

  function generateStars(poin) {
    const elements = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= poin) {
        elements.push(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="#ffbb64"
            className="bi bi-star-fill flex align-center"
            viewBox="0 0 16 16"
            key={i}
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        );
      } else {
        elements.push(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="#D9D9D9"
            className="bi bi-star-fill"
            viewBox="0 0 16 16"
            key={i}
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        );
      }
    }
    return elements;
  }

  function generateDate(date) {
    const datePart = date.split(" ")[0];
    const [year, month, day] = datePart.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="w-[90%] h-auto py-6 px-4 md:px-8 rounded-xl mt-[20px] border-2 border-slate-200">
      <div className="flex align-center justify-between">
        <h3 className="font-poppins font-medium text-[#ffbb64] text-sm sm:text-lg md:text-xl">
          Penilaian & Ulasan
        </h3>
        <Link
          to={`/konsultasi/${id_praktek}/penilaian-detail`}
          className="font-poppins font-medium text-[#2D3236] text-sm sm:text-lg md:text-xl"
        >
          Lihat semua
        </Link>
      </div>

      <div className="flex justify-between flex-col md:flex-row align-center">
        {rekamCommentFilter?.length > 0 ? (
          rekamCommentFilter?.map((comment, index) => (
            <Link
              key={index}
              to={`/konsultasi/${id_praktek}/penilaian-detail`}
              className="cursor-pointer border-2 border-slate-200 rounded-xl w-[100%] md:w-[48%] h-auto p-4 bg-white gap-6 mt-[18px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            >
              <div className=" flex align-center gap-2 items-center">
                <div className="w-[36px] h-[36px] text-center font-medium line-height-[24px] overflow-hidden rounded-full">
                  <img
                    src={
                      comment?.pelanggan?.url_photo.includes("images/")
                        ? `http://localhost:5000/${comment?.pelanggan?.url_photo}`
                        : comment?.pelanggan?.url_photo
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="font-medium text-dark font-poppins text-[16px]">
                  {capitalizeWords(comment?.pelanggan?.username)}
                </h5>
              </div>
              <div className="mt-[4px] flex align-center gap-2">
                <div className="flex gap-[1px] justify-center items-center">
                  {generateStars(comment?.rating)}
                </div>
                <h4 className="font-light text-subtle-grey font-poppins text-[12px] sm:text-[14px]">
                  {generateDate(comment?.tanggal_komentar)}
                </h4>
              </div>
              <span className="line-clamp-2 mt-[4px] font-normal text-dark-grey font-poppins line-clamp-2 text-[12px] sm:text-[14px]">
                {comment?.komentar}
              </span>
            </Link>
          ))
        ) : (
          <span className="mt-[20px] font-poppins font-normal text-dark-grey text-sm sm:text-lg">
            Belum ada penilaian untuk praktek ini.
          </span>
        )}
      </div>
    </div>
  );
};

export default KotakComment;
