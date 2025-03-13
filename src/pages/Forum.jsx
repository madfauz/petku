import React from "react";
import Layout from "./Layout";
import ArtikelPopuler from "../components/ArtikelPopuler";
import ArtikelTerbaru from "../components/ArtikelTerbaru";

const Forum = () => {
  return (
    <Layout>
      <div>
        <h2 className=" px-[160px] pt-24 text-3xl font-semibold">
          Artikel Populer
        </h2>
        <div className="flex justify-center items-start pt-12 px-4">
          <div className="w-[600px] h-[300px] bg-red-700"></div>
          <div>
            <ArtikelPopuler />
            <ArtikelPopuler />
            <ArtikelPopuler />
          </div>
        </div>

        <h2 className=" px-[160px] pt-8 text-3xl font-semibold">
          Artikel Terbaru
        </h2>

        <div>
          <div className=" px-[160px] flex items-center pt-8">
            <ArtikelTerbaru />
            <ArtikelTerbaru />
            <ArtikelTerbaru />
            <ArtikelTerbaru />
          </div>

          <div className=" px-[160px] flex items-center pt-4">
            <ArtikelTerbaru />
            <ArtikelTerbaru />
            <ArtikelTerbaru />
            <ArtikelTerbaru />
          </div>
        </div>
        <div></div>
      </div>
    </Layout>
  );
};

export default Forum;
