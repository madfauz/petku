import React, { useEffect } from "react";
import Layout from "./Layout";
import TitleCard from "../components/TitleCard";
import Jumbotron from "../components/Jumbotron";
import KotakHewanEdit from "../components/KotakHewanEdit";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAnimals, getAnimalsByIdPelanggan } from "../features/animalSlice";
import { getUserByCookie } from "../features/userSlice";

const HewanEdit = () => {
  const location = useLocation();
  const data = location.state;

  const dispatch = useDispatch();

  let { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserByCookie());
    dispatch(getAnimals());
  }, []);

  useEffect(() => {
    if (user !== null) {
      dispatch(getAnimalsByIdPelanggan(user.id_user));
    }
  }, [user]);

  return (
    <Layout>
      <TitleCard>{[true, "/hewan", "Kembali"]}</TitleCard>
      <div className="w-[92%] md:w-[86%] xl:w-[80%]">
        <Jumbotron data="hewan" />
        <div className="flex flex-col justify-center md:flex-row gap-4">
          <KotakHewanEdit data={data} />
        </div>
      </div>
    </Layout>
  );
};
export default HewanEdit;
