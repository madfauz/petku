import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import SearchBar from "../components/SearchBar";
import Slider from "../components/Slider";
import CardKonsul from "../components/CardKonsul";
import CardForum from "../components/CardForum";
import CardJadwal from "../components/CardJadwal";
import CardRekam from "../components/CardRekam";
import TitleCard from "../components/TitleCard";
import OptionButton from "../components/OptionButton";
import { doctors, forums } from "../data_dummy";
import { useDispatch, useSelector } from "react-redux";
import { getUserByCookie, reset as resetUser } from "../features/userSlice";
import {
  getJadwalsByIdUser,
  reset as resetJadwal,
} from "../features/jadwalSlice";
import { getRekamByIdUser } from "../features/rekamSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.user);
  let { jadwalsByIdUser, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.jadwal
  );
  let { rekam } = useSelector((state) => state.rekam);

  useEffect(() => {
    dispatch(resetJadwal());
    dispatch(resetUser());
    dispatch(getUserByCookie());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getJadwalsByIdUser(user?.id_user));
      dispatch(getRekamByIdUser({ id_user: user?.id_user, role: user?.role }));
    }
  }, [user]);

  return (
    <Layout>
      <SearchBar />
      <Slider />
      <OptionButton>
        {["Kucing", "Anjing", "Burung", "Kelinci", "Hamster", "Iguana"]}
      </OptionButton>
      {jadwalsByIdUser?.data.length != 0 && user != null ? (
        <>
          <TitleCard>{[false, "", "Jadwal Temu"]}</TitleCard>
          <CardJadwal data={jadwalsByIdUser} />
        </>
      ) : (
        <></>
      )}
      <TitleCard>
        {[false, "", "Konsultasi", "Lihat Semua", "/konsultasi"]}
      </TitleCard>
      <CardKonsul />
      {rekam?.data?.rekam_medis.length != 0 && user != null ? (
        <>
          <TitleCard>
            {[false, "", "Rekam Medis", "Lihat Semua", "/rekam"]}
          </TitleCard>
          <CardRekam
            data={{ rekam: rekam?.data?.rekam_medis, role: user?.role }}
          />
        </>
      ) : (
        <></>
      )}
      <TitleCard>
        {[false, "", "Forum Terkini", "Lihat Semua", "/forum"]}
      </TitleCard>
      <CardForum>{forums}</CardForum>
    </Layout>
  );
};

export default Dashboard;
