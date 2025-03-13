import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import TitleCard from "../components/TitleCard";
import KotakDetailComment from "../components/KotakDetailComment";

const PenilaianDetail = () => {
  const path = window.location.pathname;
  const pathSegments = path.split("/");
  const id_praktek = pathSegments[2];

  return (
    <Layout>
      <TitleCard>{[true, `/konsultasi/${id_praktek}`, "Kembali"]}</TitleCard>
      <KotakDetailComment />
    </Layout>
  );
};

export default PenilaianDetail;
