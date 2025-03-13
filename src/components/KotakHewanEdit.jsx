import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, editByIdAnimal } from "../features/animalSlice";
import { useNavigate } from "react-router-dom";

const KotakHewanEdit = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [namaHewan, setNamaHewan] = useState(data.nama);
  const [jenisHewan, setJenisHewan] = useState(data.jenis_hewan);
  let { message, isSuccess, isLoading, isError } = useSelector(
    (state) => state.animal
  );

  const opsiHewan = [
    { value: "kucing", label: "Kucing", selected: false },
    { value: "anjing", label: "Anjing", selected: false },
    { value: "hamster", label: "Hamster", selected: false },
    { value: "burung", label: "Burung", selected: false },
    { value: "kelinci", label: "Kelinci", selected: false },
    { value: "iguana", label: "Iguana", selected: false },
  ];

  const filterOpsiHewan = opsiHewan.map((hewan, index) => {
    const animals = [...opsiHewan];
    if (hewan.value == data.jenis_hewan) {
      animals[index].selected = true;
    }
    return animals[index];
  });

  const selectedHewan = filterOpsiHewan.find(
    (hewan) => hewan.selected == true
  )?.value;

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(
        editByIdAnimal({
          id_hewan: data.id_hewan,
          nama: namaHewan,
          jenis_hewan: jenisHewan,
        })
      );
    } catch (error) {
      console.log(message);
    }
  };

  useEffect(() => {
    if (isSuccess && message == "Data berhasil diubah") {
      navigate("/hewan");
    }
  }, [isSuccess, message]);

  return (
    <div className="my-4 p-4 border-[1px] border-slate-200 bg-subtle-white rounded-xl md:basis-1/2">
      <h3 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-dark-grey">
        Ubah data Peliharaan mu
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
          className="border-[1px] border-subtle-grey rounded-xl w-full py-2 px-4"
          id="nama"
          value={namaHewan}
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
            value={selectedHewan}
          >
            {opsiHewan.map((hewan, index) => (
              <option key={index} value={hewan.value}>
                {hewan.label}
              </option>
            ))}
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

export default KotakHewanEdit;
