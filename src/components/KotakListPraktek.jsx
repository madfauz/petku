import React from "react";
import { Link } from "react-router-dom";
import { Cat, Dog, Bird, Chameleon, Hamster, Rabbit } from "./icon/PetIcon";

const KotakListPraktek = ({ data, handleDelete }) => {
  return (
    <div className="mt-4 h-[max-content] p-4 bg-subtle-white border-[1px] border-subtle-grey rounded-xl md:basis-1/2">
      <h3 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-dark-grey">
        Jadwal Praktek
      </h3>
      <div className="mt-2 flex flex-col justify-between gap-4">
        {data !== null ? (
          data?.map((practice, index) => (
            <div
              key={index}
              className="flex flex-col w-full border-[1px] rounded-md border-subtle-grey p-3 justify-between align-center bg-white gap-2"
            >
              <section className="flex justify-between w-full">
                <aside className="flex gap-2 align-center">
                  <div className="border-none border-full bg-subtle-yellow rounded-full p-1">
                    {practice?.spesialis[0] == "kucing" ? (
                      <Cat />
                    ) : practice?.spesialis[0] == "anjing" ? (
                      <Dog />
                    ) : practice?.spesialis[0] == "hamster" ? (
                      <Hamster />
                    ) : practice?.spesialis[0] == "kelinci" ? (
                      <Rabbit />
                    ) : practice?.spesialis[0] == "burung" ? (
                      <Bird />
                    ) : (
                      <Chameleon />
                    )}
                  </div>
                  <h4 className="text-sm sm:text-xl font-poppins font-bold my-auto text-subtle-yellow">
                    {practice?.spesialis[0]}
                  </h4>
                </aside>
                <aside className="flex gap-2">
                  <Link to="/praktek/edit" state={practice} className="my-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path
                        fill="grey"
                        d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z"
                      ></path>
                      <path
                        fill="grey"
                        d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2z"
                      ></path>
                    </svg>
                  </Link>
                  <Link
                    className="my-auto"
                    onClick={() =>
                      handleDelete(practice.id_praktek, practice?.spesialis[0])
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path
                        fill="grey"
                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                      ></path>
                    </svg>
                  </Link>
                </aside>
              </section>
              <section className="flex flex-col gap-1 sm:gap-2">
                {practice?.promo ? (
                  <aside className="flex gap-2 align-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="w-8 h-8"
                    >
                      <g fill="none" className="stroke-subtle-grey">
                        <path
                          strokeWidth={2}
                          d="M10.51 3.665a2 2 0 0 1 2.98 0l.7.782a2 2 0 0 0 1.601.663l1.05-.058a2 2 0 0 1 2.107 2.108l-.058 1.049a2 2 0 0 0 .663 1.6l.782.7a2 2 0 0 1 0 2.981l-.782.7a2 2 0 0 0-.663 1.601l.058 1.05a2 2 0 0 1-2.108 2.107l-1.049-.058a2 2 0 0 0-1.6.663l-.7.782a2 2 0 0 1-2.981 0l-.7-.782a2 2 0 0 0-1.601-.663l-1.05.058a2 2 0 0 1-2.107-2.108l.058-1.049a2 2 0 0 0-.663-1.6l-.782-.7a2 2 0 0 1 0-2.981l.782-.7a2 2 0 0 0 .663-1.601l-.058-1.05A2 2 0 0 1 7.16 5.053l1.049.058a2 2 0 0 0 1.6-.663z"
                        ></path>
                        <path
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M9.5 9.5h.01v.01H9.5zm5 5h.01v.01h-.01z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m15 9l-6 6"
                        ></path>
                      </g>
                    </svg>
                    <h4 className="text-md sm:text-lg font-poppins text-dark-grey font-semibold my-auto">
                      : Rp. {practice?.harga_promo}
                    </h4>
                  </aside>
                ) : (
                  <></>
                )}
                <aside className="flex gap-2 align-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="w-8 h-8"
                  >
                    <path fill="#CCCCCC" d="M16 14H2v-1h13V6h1z"></path>
                    <path fill="#CCCCCC" d="M13 4v7H1V4zm1-1H0v9h14z"></path>
                    <path
                      fill="#CCCCCC"
                      d="M3 6H2v3h1v1h4a2.5 2.5 0 1 1 0-5H3zm8 0V5H7a2.5 2.5 0 1 1 0 5h4V9h1V6z"
                    ></path>
                  </svg>
                  <h4 className="text-md sm:text-lg font-poppins text-dark-grey font-semibold my-auto">
                    : Rp. {practice?.harga}
                  </h4>
                </aside>
                <aside className="flex gap-2 align-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 100 100"
                    className="w-8 h-8"
                  >
                    <path
                      fill="#CCCCCC"
                      d="m44.105 55.641l3.598-2.079l-4.666-3.925z"
                    ></path>
                    <path
                      fill="#CCCCCC"
                      d="M88.558 49.96c0-.885-.435-1.663-1.097-2.151l.014-.024l-9.324-5.383l5.367-9.296l-.018-.011a2.67 2.67 0 0 0-.127-2.408a2.67 2.67 0 0 0-2.025-1.314v-.026H70.58V18.61h-.022a2.67 2.67 0 0 0-1.314-2.022a2.66 2.66 0 0 0-2.412-.125l-.013-.023l-9.481 5.474l-5.25-9.094l-.019.011a2.67 2.67 0 0 0-2.149-1.094c-.885 0-1.664.435-2.151 1.097l-.024-.014l-5.337 9.244l-9.19-5.306l-.011.019a2.67 2.67 0 0 0-2.408.127a2.67 2.67 0 0 0-1.315 2.025h-.027v10.674H18.845v.021a2.67 2.67 0 0 0-2.022 1.314a2.67 2.67 0 0 0-.126 2.41l-.023.014l5.246 9.087l-9.394 5.424l.011.019a2.67 2.67 0 0 0-1.094 2.149c0 .885.435 1.664 1.097 2.151l-.014.024l9.324 5.383l-5.367 9.296l.018.01a2.67 2.67 0 0 0 .127 2.408a2.67 2.67 0 0 0 2.025 1.314v.027H29.42V81.39h.022c.092.816.549 1.58 1.314 2.022a2.67 2.67 0 0 0 2.412.125l.013.023l9.481-5.474l5.25 9.094l.019-.011a2.67 2.67 0 0 0 2.149 1.094c.885 0 1.664-.435 2.151-1.096l.023.013l5.337-9.244l9.191 5.306l.011-.019a2.67 2.67 0 0 0 2.408-.127a2.66 2.66 0 0 0 1.315-2.025h.027V70.398h10.613v-.021a2.67 2.67 0 0 0 2.022-1.314a2.67 2.67 0 0 0 .126-2.41l.023-.013l-5.246-9.087l9.394-5.424l-.011-.019a2.67 2.67 0 0 0 1.094-2.15M37.537 65.197c-2.23 1.288-4.252 1.464-5.971 1.002l.241-2.697c1.302.377 2.985.375 4.575-.544c1.367-.789 1.658-1.765 1.269-2.438c-1.159-2.006-6.992 3.23-9.499-1.111c-1.108-1.92-.367-4.471 2.35-6.039c1.833-1.059 3.675-1.383 5.426-.988l-.309 2.623c-1.433-.324-2.908-.004-4.084.674c-1.038.6-1.367 1.389-.967 2.082c1.049 1.816 6.965-3.236 9.451 1.069c1.219 2.109.616 4.58-2.482 6.367m13.943-8.326l-1.854-1.535l-4.947 2.856l.401 2.374l-2.785 1.607L40.08 48.07l3.079-1.777l11.106 8.971zm3.753-2.166l-6.661-11.538l2.474-1.429l5.413 9.375l4.878-2.816l1.249 2.163zm9.012-5.203l-6.661-11.537l8.164-4.715l1.248 2.162l-5.707 3.296l1.398 2.422l5.586-3.226l1.248 2.162l-5.586 3.225l1.518 2.63l5.708-3.296l1.249 2.162z"
                    ></path>
                  </svg>
                  <h4 className="text-md sm:text-lg font-poppins text-dark-grey font-semibold my-auto">
                    : {practice?.promo ? "Aktif" : "Tidak Aktif"}
                  </h4>
                </aside>
              </section>
              <section className="flex flex-col w-full gap-2 rounded-xl ">
                {practice?.jadwal_waktu.map((item, index) => (
                  <aside key={index} className="flex flex-col gap-2">
                    <div className="w-[130px] sm:w-[150px] h-[max-content] md:w-[120px] lg:w-[140px] px-7 sm:px-10 py-1 sm:py-2 border-none rounded-full bg-subtle-yellow">
                      <h4 className="text-white text-center mx-auto font-poppins font-medium">
                        {item?.day}
                      </h4>
                    </div>
                    <div className="w-full flex flex-wrap gap-1">
                      {item?.times.map((waktu, index) => (
                        <div
                          key={index}
                          className="w-[130px] sm:w-[150px] h-[max-content] md:w-[120px] lg:w-[140px] px-1 sm:px-10 py-1 sm:py-2 border-[1px] border-subtle-grey rounded-full flex justify-center gap-1 font-poppins font-medium text-dark-grey"
                        >
                          <h4>{waktu?.start}</h4>-<h4>{waktu?.end}</h4>
                        </div>
                      ))}
                    </div>
                  </aside>
                ))}
              </section>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default KotakListPraktek;
