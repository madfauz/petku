import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPracticeByIdPraktek } from "../features/practiceSlice";
import { getUserByCookie } from "../features/userSlice";
import Layout from "./Layout";
import KotakDetailKonsul from "../components/KotakDetailKonsul";
import TanggalTemu from "../components/TanggalTemu";
import TitleCard from "../components/TitleCard";
import KotakComment from "../components/KotakComment";

const DetailKonsultasi = () => {
  const dispatch = useDispatch();
  const { practice } = useSelector((state) => state.practice);
  let { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getPracticeByIdPraktek());
    dispatch(getUserByCookie());
  }, []);

  return (
    <Layout>
      <div className="w-full sm:w-auto flex flex-col items-start justify-center mb-8 px-2">
        <TitleCard>{[true, "/", "Pilih Jadwal Konsultasi"]}</TitleCard>
        <div
          className="mt-2 w-full sm:w-[600px] md:w-[750px] lg:w-[1000px] h-auto rounded-xl flex flex-col items-center py-5 md:py-10
            shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]"
        >
          <div className="w-[90%] flex flex-col md:flex-row justify-between gap-[30px]">
            <KotakDetailKonsul data={practice} />
            <TanggalTemu data={practice} user={user} />
          </div>

          <KotakComment />
        </div>
      </div>
    </Layout>
  );
};

export default DetailKonsultasi;
