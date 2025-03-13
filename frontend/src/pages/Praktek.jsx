import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import TitleCard from "../components/TitleCard";
import Jumbotron from "../components/Jumbotron";
import KotakListPraktek from "../components/KotakListPraktek";
import KotakPraktekForm from "../components/KotakPraktekForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getPracticeByIdDokter,
  deletePraktek,
} from "../features/practiceSlice";
import { reset, getUserByCookie } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Praktek = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { user, message } = useSelector((state) => state.user);
  let { practicesByIdDokter } = useSelector((state) => state.practice);
  const [alert, setAlert] = useState(false);
  const [spesialis, setSpesialis] = useState("");
  const [id_praktek, setIdPraktek] = useState("");

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  useEffect(() => {
    if (user !== null) {
      dispatch(getPracticeByIdDokter({ id_dokter: user.id_user }));
    }
    if (message == "Token tidak valid") {
      dispatch(reset());
      navigate("/login");
      window.location.reload();
    }
  }, [user]);

  const showAlert = (id, nama) => {
    setAlert(true);
    setSpesialis(nama);
    setIdPraktek(id);
  };

  const hideAlert = () => {
    setAlert(false);
  };

  const onDelete = (id) => {
    try {
      dispatch(deletePraktek({ id_praktek: id }));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div
        className={`fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition items-center ${
          alert ? "flex" : "hidden"
        }`}
      >
        <div
          aria-hidden="true"
          className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
        ></div>

        <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
          <div className="w-full py-2 bg-white cursor-default pointer-events-auto relative rounded-xl mx-auto max-w-sm">
            <button
              onClick={hideAlert}
              tabIndex="-1"
              type="button"
              className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
            >
              <svg
                title="Close"
                tabIndex="-1"
                className="h-4 w-4 cursor-pointer text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close</span>
            </button>

            <div className="space-y-2 p-2">
              <div className="p-4 space-y-2 text-center dark:text-white">
                <h2
                  className="text-xl font-bold text-black tracking-tight"
                  id="page-action.heading"
                >
                  Hapus {`Praktek Spesialis ${spesialis}`}
                </h2>

                <p className="text-gray-500">
                  Kamu yakin ingin menghapus praktek ini? jika praktek ini
                  dihapus, maka semua data terkait praktek ini akan hilang.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div
                aria-hidden="true"
                className="border-t dark:border-gray-700 px-2"
              ></div>

              <div className="px-6 py-2">
                <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                  <button
                    type="button"
                    onClick={hideAlert}
                    className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none hover:bg-dark-grey hover:text-white duration-300 border-dark-grey border-1"
                  >
                    <span className="flex items-center gap-1">
                      <span className="">Kembali</span>
                    </span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none bg-light-yellow  hover:bg-dark-grey duration-300 text-white border-none"
                    onClick={() => {
                      onDelete(id_praktek);
                    }}
                  >
                    <span className="flex items-center gap-1">
                      <span className="">Konfirmasi</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TitleCard>{[true, "/", "Kembali"]}</TitleCard>
      <div className="w-[92%] md:w-[86%] xl:w-[80%]">
        <Jumbotron data="praktek" />
        <div className="flex flex-col md:flex-row gap-4">
          <KotakListPraktek
            handleDelete={showAlert}
            data={practicesByIdDokter}
          />
          <KotakPraktekForm />
        </div>
      </div>
    </Layout>
  );
};
export default Praktek;
