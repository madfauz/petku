import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import TitleCard from "../components/TitleCard";
import KotakDetailRekam from "../components/KotakDetailRekam";
import { useDispatch, useSelector } from "react-redux";
import { getUserByCookie } from "../features/userSlice";
import { getRekamByIdUser } from "../features/rekamSlice";

const Rekam = () => {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.user);
  let { rekam } = useSelector((state) => state.rekam);

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getRekamByIdUser({ id_user: user?.id_user, role: user?.role }));
    }
  }, [user]);

  return (
    <Layout>
      <TitleCard>{[true, "/", "Kembali"]}</TitleCard>
      <KotakDetailRekam
        data={{ rekam: rekam?.data?.rekam_medis, role: user?.role }}
      />
    </Layout>
  );
};

export default Rekam;
