import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPracticeByIdPraktek } from "../features/practiceSlice";
import Layout from "./Layout";
import KotakKonfirmasi from "../components/KotakKonfirmasi";
import KotakKonfirmasiDiri from "../components/KotakKonfirmasiDiri";
import TitleCard from "../components/TitleCard";
import { useLocation } from "react-router-dom";
import { getUserByCookie } from "../features/userSlice";

const KonfirmasiKonsultasi = () => {
  const location = useLocation();
  const data = location.state;
  const day = data?.day;
  const time = data?.time;
  const id_praktek = data?.id_praktek;

  let { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { practice } = useSelector((state) => state.practice);

  useEffect(() => {
    dispatch(getUserByCookie());
    dispatch(getPracticeByIdPraktek());
  }, []);

  return (
    <Layout>
      <div className="w-full sm:w-auto flex flex-col items-start justify-center mb-8 px-2">
        <TitleCard>
          {[true, `/konsultasi/${id_praktek}`, "Konfirmasi Konsultasi"]}
        </TitleCard>
        <div
          className="mt-2 w-full sm:w-[600px] md:w-[750px] lg:w-[1000px] h-auto rounded-xl flex flex-col items-center py-5 md:py-10
            shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]"
        >
          <div className="w-[90%] flex flex-col md:flex-row justify-between gap-[30px]">
            <KotakKonfirmasi
              data={practice}
              dateTime={{
                day,
                time,
              }}
            />
            <KotakKonfirmasiDiri
              data={{ practice, user }}
              dateTime={{
                day,
                time,
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KonfirmasiKonsultasi;
