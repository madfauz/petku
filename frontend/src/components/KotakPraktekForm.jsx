import React, { useState, useEffect } from "react";
import { reset, createPractice } from "../features/practiceSlice";
import { useDispatch, useSelector } from "react-redux";

const KotakPraktekForm = () => {
  const dispatch = useDispatch();
  const [dateTimes, setDateTimes] = useState([
    { day: "minggu", times: [{ start: "00:00", end: "00:00" }] },
  ]);
  const [message, setMessage] = useState("");
  const [promo, setPromo] = useState(false);
  const [spesialis, setSpesialis] = useState("kucing");
  const [harga, setHarga] = useState(0);
  const [hargaPromo, setHargaPromo] = useState(0);
  const { message: messagePractice } = useSelector((state) => state.practice);

  const addHari = () => {
    if (dateTimes.length + 1 <= 7) {
      setDateTimes((prevDateTimes) => [
        ...prevDateTimes,
        { day: "minggu", times: [{ start: "00:00", end: "00:00" }] },
      ]);
    }
  };
  const addWaktu = (index_hari) => {
    setDateTimes((prevDateTimes) => [
      ...prevDateTimes.slice(0, index_hari),
      {
        ...prevDateTimes[index_hari],
        times: [
          ...prevDateTimes[index_hari].times,
          { start: "00:00", end: "00:00" },
        ],
      },
      ...prevDateTimes.slice(index_hari + 1),
    ]);
  };

  const editHari = (index_hari, day) => {
    setDateTimes((prevDateTimes) => {
      const newDateTimes = [...prevDateTimes];
      newDateTimes[index_hari].day = day;
      return newDateTimes;
    });
  };
  const editWaktu = (index_hari, index_waktu, waktu, position) => {
    setDateTimes((prevDateTimes) => {
      const newDateTimes = [...prevDateTimes];
      if (position === "start") {
        newDateTimes[index_hari].times[index_waktu].start = waktu;
      } else {
        newDateTimes[index_hari].times[index_waktu].end = waktu;
      }
      return newDateTimes;
    });
  };

  const deleteHari = (index_hari) => {
    setDateTimes((prevDateTimes) => [
      ...prevDateTimes.slice(0, index_hari),
      ...prevDateTimes.slice(index_hari + 1),
    ]);
  };

  const deleteWaktu = (index_hari, index_waktu) => {
    setDateTimes((prevDateTimes) => [
      ...prevDateTimes.slice(0, index_hari),
      {
        ...prevDateTimes[index_hari],
        times: [
          ...prevDateTimes[index_hari].times.slice(0, index_waktu),
          ...prevDateTimes[index_hari].times.slice(index_waktu + 1),
        ],
      },
      ...prevDateTimes.slice(index_hari + 1),
    ]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      const days = dateTimes.map((date) => date.day);
      const setDays = new Set(days);
      if (setDays.size !== days.length) {
        setMessage("Hari yang dipilih harus berbeda");
      } else {
        setMessage("");
        dispatch(
          createPractice({
            promo: promo,
            harga: harga,
            harga_promo: promo ? hargaPromo : 0,
            spesialis: spesialis,
            jadwal_waktu: dateTimes,
          })
        );
      }
    } catch (error) {
      setMessage(error.message);
    }
  };
  useEffect(() => {
    if (messagePractice == "Data berhasil ditambahkan") {
      window.location.reload();
    }
  }, [messagePractice]);

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    setMessage(messagePractice);
  }, [messagePractice]);

  return (
    <div className="my-4 p-4 border-[1px] h-[max-content] border-subtle-grey bg-subtle-white rounded-xl md:basis-1/2">
      <h3 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-dark-grey">
        Daftarkan Praktek mu
      </h3>
      <form action="" className="my-4 display flex flex-col gap-2">
        <label
          htmlFor="spesialis"
          className="text-dark-grey font-semibold font-poppins text-md"
        >
          Spesialis Hewan
        </label>
        {/* Select option */}
        <div className="relative w-full">
          <select
            name="spesialis"
            id="spesialis"
            className="pr-10 border-[1px] border-subtle-grey rounded-xl w-full py-2 px-4 appearance-none"
            value={spesialis}
            onChange={(e) => setSpesialis(e.target.value)}
          >
            <option value="kucing">Kucing</option>
            <option value="anjing">Anjing</option>
            <option value="burung">Burung</option>
            <option value="kelinci">Kelinci</option>
            <option value="hamster">Hamster</option>
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
        <label
          htmlFor="harga"
          className="text-dark-grey font-semibold font-poppins text-md"
        >
          Harga
        </label>
        <input
          placeholder="Masukkan tarif untuk praktek mu..."
          type="text"
          name="harga"
          className="border-[1px] border-subtle-grey rounded-xl w-full p-2"
          id="harga"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
        />

        <label
          htmlFor="promo"
          className="text-dark-grey font-semibold font-poppins text-md"
        >
          Promo
        </label>
        {/* Select option */}
        <div className="relative w-full">
          <select
            name="promo"
            id="promo"
            className="pr-10 border-[1px] border-subtle-grey rounded-xl w-full py-2 px-4 appearance-none"
            onChange={() => setPromo(!promo)}
          >
            <option value={false} className="">
              Tidak aktif
            </option>
            <option value={true} className="">
              Aktif
            </option>
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

        {promo ? (
          <>
            <label
              htmlFor="nama"
              className="text-dark-grey font-semibold font-poppins text-md"
            >
              Harga Promo
            </label>
            <input
              placeholder="Masukkan tarif untuk praktek mu..."
              type="text"
              name="nama"
              className="border-[1px] border-subtle-grey rounded-xl w-full p-2"
              id="nama"
              value={hargaPromo}
              onChange={(e) => setHargaPromo(e.target.value)}
            />
          </>
        ) : (
          <></>
        )}

        <section className="w-full flex flex-col gap-2">
          {dateTimes?.map((date, index_hari) => (
            <div
              className="p-4 border-[1px] border-slate-200 rounded-xl flex flex-col gap-2 bg-white"
              key={index_hari}
            >
              <label
                htmlFor="hari"
                className="text-dark-grey font-semibold font-poppins text-md"
              >
                Hari ke {index_hari + 1}
              </label>
              {/* Select option */}
              <div className="relative w-full">
                <select
                  name="hari"
                  id="hari"
                  className="pr-10 border-[1px] border-slate-200 rounded-xl w-full py-2 px-4 appearance-none"
                  value={date.day}
                  onChange={(e) => {
                    editHari(index_hari, e.target.value);
                  }}
                >
                  <option value="Minggu">Minggu</option>
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                  <option value="Sabtu">Sabtu</option>
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
              <label
                htmlFor={`waktu-${index_hari}`}
                className="text-dark-grey font-semibold font-poppins text-md"
              >
                Waktu
              </label>
              {date.times.map((time, index_waktu) => (
                <div className="flex gap-2 justify-between" key={index_waktu}>
                  <input
                    type="time"
                    name={`waktu-${index_hari}-${index_waktu}-start`}
                    id={`waktu-${index_hari}-${index_waktu}-start`}
                    value={time.start}
                    className="border-[1px] border-slate-200 rounded-xl w-full p-2"
                    onChange={(e) =>
                      editWaktu(
                        index_hari,
                        index_waktu,
                        e.target.value,
                        "start"
                      )
                    }
                  />
                  <span className="text-subtle-grey my-auto font-poppins font-extrabold">
                    -
                  </span>
                  <input
                    type="time"
                    name={`waktu-${index_hari}-${index_waktu}-end`}
                    id={`waktu-${index_hari}-${index_waktu}-end`}
                    value={time.end}
                    className="border-[1px] border-slate-200 rounded-xl w-full p-2"
                    onChange={(e) =>
                      editWaktu(index_hari, index_waktu, e.target.value, "end")
                    }
                  />
                  <button
                    type="button"
                    className="my-auto"
                    onClick={() => deleteWaktu(index_hari, index_waktu)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path
                        fill="currentColor"
                        className="bg-dark-grey"
                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                      ></path>
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="w-full border-[1px] border-subtle-grey hover:bg-subtle-grey hover:text-white duration-300 mt-2 py-2 rounded-xl text-subtle-grey font-medium font-poppins"
                onClick={() => addWaktu(index_hari)}
              >
                Tambah Waktu
              </button>
              <button
                type="button"
                className="w-full border-[1px] border-subtle-grey hover:bg-subtle-grey hover:text-white duration-300 mt-2 py-2 rounded-xl text-subtle-grey font-medium font-poppins"
                onClick={() => deleteHari(index_hari)}
              >
                Hapus Hari
              </button>
            </div>
          ))}
        </section>

        <button
          type="button"
          className="w-full border-[1px] border-subtle-grey hover:bg-subtle-grey hover:text-white duration-300 mt-4 py-2 rounded-xl text-dark-grey  transition font-medium font-poppins"
          onClick={addHari}
        >
          Tambah Hari
        </button>
        <h4 className="text-[14px] sm:text-[18px] md:text-[14px] xl:text-[18px] font-normal font-poppins text-start w-full text-red-400">
          {message}
        </h4>
        <button
          type="submit"
          className="w-full bg-light-yellow hover:bg-dark-grey duration-300 mt-4 py-2 rounded-xl text-white font-semibold font-poppins"
          onClick={onSubmit}
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default KotakPraktekForm;
