import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRekamByIdPraktek } from "../features/rekamSlice";

const KotakDetailComment = () => {
  const dispatch = useDispatch();

  let { rekamById } = useSelector((state) => state.rekam);
  const rekamComment = rekamById?.data?.rekam_medis;
  const rekamCommentFilter = rekamComment?.filter((rekam) => {
    return rekam.tanggal_komentar !== null;
  });

  const url = window.location.href;
  const id_praktek = url.split("/")[4];

  useEffect(() => {
    dispatch(getRekamByIdPraktek({ id_praktek: id_praktek }));
  }, []);

  function generateStars(poin) {
    const elements = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= poin) {
        elements.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="auto"
            height="auto"
            fill="#ffbb64"
            className="bi bi-star-fill flex align-center w-[12px] h-[12px] sm:w-[16px] sm:h-[16px]"
            viewBox="0 0 16 16"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        );
      } else {
        elements.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="auto"
            height="auto"
            fill="#C7C7C7"
            className="bi bi-star-fill flex align-center w-[12px] h-[12px] sm:w-[16px] sm:h-[16px]"
            viewBox="0 0 16 16"
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
    <div className="flex flex-col align-center w-[92%] md:w-[86%] xl:w-[80%] mt-[18px] gap-6">
      {rekamCommentFilter?.length > 0 ? (
        rekamCommentFilter.map((comment, index) => (
          <div
            key={index}
            className="border-2 border-slate-200 rounded-xl w-[100%] sm:w-[92%] lg:w-[80%] h-auto p-4 bg-white gap-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          >
            <div className=" flex align-center gap-2 items-center">
              <div className=" w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] text-center font-medium line-height-[24px] overflow-hidden rounded-full">
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
              <div>
                <h5 className="text-dark-grey font-bold font-poppins font-bold text-[14px] sm:text-[16px] sm:text-[20px]">
                  {capitalizeWords(comment?.pelanggan?.username)}
                </h5>
                <div className="flex align-center gap-2">
                  <div className="flex gap-[2px] justify-center items-center">
                    {generateStars(comment?.rating)}
                  </div>
                  <h4 className="text-subtle-grey font-bold font-poppins font-medium text-[12px] sm:text-[16px]">
                    {generateDate(comment?.tanggal_komentar)}
                  </h4>
                </div>
              </div>
            </div>

            <div className="mt-[12px] font-normal text-dark-grey font-poppins text-[12px] sm:text-[16px]">
              {comment?.komentar}
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-[200px]">
          <h1 className="text-subtle-grey font-bold font-poppins font-medium text-[12px] sm:text-[16px]">
            Belum ada komentar
          </h1>
        </div>
      )}
    </div>
  );
};

export default KotakDetailComment;
