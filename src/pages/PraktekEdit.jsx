import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import TitleCard from "../components/TitleCard";
import Jumbotron from "../components/Jumbotron";
import KotakPraktekEdit from "../components/KotakPraktekEdit";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PraktekEdit = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <Layout>
      <TitleCard>{[true, "/praktek", "Kembali"]}</TitleCard>
      <div className="w-[92%] md:w-[86%] xl:w-[80%]">
        <Jumbotron data="praktek" />
        <div className="flex flex-col justify-center md:flex-row gap-4">
          <KotakPraktekEdit data={data} />
        </div>
      </div>
    </Layout>
  );
};
export default PraktekEdit;
