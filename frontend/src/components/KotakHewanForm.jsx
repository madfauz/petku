import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, postAnimal } from "../features/animalSlice";

const KotakHewanForm = () => {
  const dispatch = useDispatch();
  const [namaHewan, setNamaHewan] = useState("");
  const [jenisHewan, setJenisHewan] = useState("kucing");
  let { message, isError, isSuccess } = useSelector((state) => state.animal);

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (isSuccess && message == "Data berhasil ditambahkan") {
      window.location.reload();
    }
  }, [isSuccess, message]);

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(postAnimal({ nama: namaHewan, jenis_hewan: jenisHewan }));
    } catch (error) {
      console.log(message);
    }
  };
  return (
    <div className="h-[max-content] my-4 p-4 border-[1px] border-subtle-grey bg-subtle-white rounded-xl md:basis-1/2">
      <h3 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-dark-grey">
        Daftarkan Hewan Peliharaan mu
      </h3>
      <form action="" className="my-4 display flex flex-col gap-2">
        <label
          htmlFor="nama"
          className="text-dark-grey font-medium font-poppins text-md"
        >
          Nama Hewan
        </label>
        <input
          placeholder="Masukkan Nama Hewan mu disini..."
          type="text"
          name="nama"
          className="border-[1px] border-subtle-gery rounded-xl w-full py-2 px-4"
          id="nama"
          onChange={(event) => setNamaHewan(event.target.value)}
        />
        <label
          htmlFor="jenis"
          className="text-dark-grey font-medium font-poppins text-md"
        >
          Jenis Hewan
        </label>
        {/* Select option */}
        <div className="relative w-full">
          <select
            name="jenis"
            id="jenis"
            className="border-[1px] border-subtle-grey rounded-xl w-full py-2 px-4 appearance-none"
            onChange={(event) => setJenisHewan(event.target.value)}
          >
            <option value="kucing">Kucing</option>
            <option value="anjing">Anjing</option>
            <option value="hamster">Hamster</option>
            <option value="burung">Burung</option>
            <option value="kelinci">Kelinci</option>
            <option value="iguana">Iguana</option>
          </select>
          <div className="absolute inset-y-[20px] right-0 flex items-center px-4 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-light-yellow hover:bg-dark-grey duration-300 mt-4 py-2 rounded-xl text-white font-medium font-poppins"
          onClick={onSubmit}
        >
          Simpan
        </button>

        {message && (
          <div className="my-4">
            <p className="text-dark-grey">{message}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default KotakHewanForm;
