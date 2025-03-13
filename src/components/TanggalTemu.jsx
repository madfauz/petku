import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../style/TanggalTemu.css";

const TanggalTemu = ({ data, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [keyDate, setKeyDate] = useState(0);
  const [keyTime, setKeyTime] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const practice = data;

  function getDateTimes() {
    const days = [];
    const times = [];
    const today = new Date();
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(today.getDate() + 14); // Set 2 minggu ke depan

    let currentDate = new Date(today); // Mulai dari hari ini

    // Loop melalui hari sampai 2 minggu ke depan
    while (currentDate <= twoWeeksFromNow) {
      const dayOfWeek = currentDate.getDay(); // 0: Minggu, 1: Senin, ..., 3: Rabu, 5: Jumat
      const jadwal_waktu = practice?.jadwal_waktu;

      if (jadwal_waktu?.length > 0) {
        // Loop melalui jadwal waktu
        for (const jadwal of jadwal_waktu) {
          let dayNumber = "";

          switch (jadwal.day) {
            case "Senin":
              dayNumber = 1;
              break;
            case "Selasa":
              dayNumber = 2;
              break;
            case "Rabu":
              dayNumber = 3;
              break;
            case "Kamis":
              dayNumber = 4;
              break;
            case "Jumat":
              dayNumber = 5;
              break;
            case "Sabtu":
              dayNumber = 6;
              break;
            case "Minggu":
              dayNumber = 0;
              break;
            default:
              break;
          }
          // Contoh : Jika hari adalah Rabu (3) atau Jumat (5), masukkan ke dalam array dan days belum lebih dari 6 data
          if (dayOfWeek === dayNumber) {
            if (days.length < 6) {
              times.push(jadwal.times);
              days.push(new Date(currentDate)); // Simpan tanggal
            } else {
              return days;
            }
          }
        }
      }

      // Tambahkan 1 hari ke currentDate
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return { days, times };
  }

  // Panggil fungsi dan tampilkan hasilnya
  const selectedDates = getDateTimes().days;
  const selectedTimes = getDateTimes().times;
  const times = selectedTimes[keyDate];

  // Ubah fungsi klik tanggal dan waktu
  const clickedDate = (key, date) => {
    setKeyDate(key);
    setKeyTime(0);
    setSelectedDate(date);
    setSelectedTime(selectedTimes[key][0]);
  };

  const clickedTime = (key, time) => {
    setKeyTime(key);
    setSelectedTime(time);
  };

  const handleClick = (id_praktek) => {
    if (user === null) {
      setMessage("Silahkan login terlebih dahulu");
    } else if (user?.role !== "pelanggan") {
      setMessage("Anda bukan pelanggan");
    } else {
      navigate(`/konsultasi/${id_praktek}/konfirmasi`, {
        state: {
          day: selectedDate,
          time: `${selectedTime.start} - ${selectedTime.end}`,
          id_praktek: id_praktek,
        },
      });
    }
  };

  useEffect(() => {
    if (selectedDates.length !== 0 && selectedTimes.length !== 0) {
      setSelectedDate(selectedDates[keyDate]);
      if (times[keyTime]) {
        setSelectedTime(times[keyTime]);
      } else {
        setSelectedTime("");
      }
    }
  }, [practice]);

  return (
    <div className="flex flex-col justify-start items-end gap-4">
      <div className="w-full flex gap-6 flex-col justify-center items-center">
        <div
          className="flex flex-col p-4 gap-2 md:gap-4 bg-white w-full md:w-[300px] lg:w-[500px] lg:h-[180px] rounded-xl
            shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] pb-4"
        >
          <p className="text-[16px] sm:text-[20px] font-bold text-dark-grey">
            Pilih Jadwal
          </p>

          <div
            className="bg-white flex gap-2 flex-wrap justify-start w-full h-auto"
            id="date"
          >
            {selectedDates.map((date, key) => {
              if (key == keyDate) {
                return (
                  <div
                    key={key}
                    className="w-[120px] sm:w-[150px] md:w-[130px] lg:w-[150px] h-11 border-none flex justify-center items-center
                        rounded-xl cursor-pointer selected"
                    onClick={() => clickedDate(key, date)}
                  >
                    <h2 className="font-semibold">
                      {date.toDateString().split(" ").slice(1).join(" ")}
                    </h2>
                  </div>
                );
              } else {
                return (
                  <div
                    key={key}
                    className="w-[120px] sm:w-[150px] md:w-[130px] lg:w-[150px] h-11 border-2 hover:border-transparent flex justify-center items-center
                        rounded-xl cursor-pointer not-selected duration-300"
                    onClick={() => clickedDate(key, date)}
                  >
                    <h2 className="font-medium text-dark-grey">
                      {date.toDateString().split(" ").slice(1).join(" ")}
                    </h2>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div
          className="flex flex-col p-4 gap-2 md:gap-4 bg-white w-full md:w-[300px] lg:w-[500px] lg:h-[180px] rounded-xl
            shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] pb-4"
        >
          <h2 className="text-[16px] sm:text-[20px] font-bold text-dark-grey">
            Pilih Jam Operasi
          </h2>

          <div className="bg-white flex gap-2 flex-wrap justify-start w-full h-auto">
            {times?.map((time, key) => {
              if (key == keyTime) {
                return (
                  <div
                    key={key}
                    className="w-[120px] sm:w-[150px] md:w-[130px] lg:w-[150px] h-11 border-none flex justify-center items-center
                        rounded-xl cursor-pointer selected font-medium"
                    onClick={() => clickedTime(key, time)}
                  >
                    <h2 className="font-medium text-white">{time.start}</h2> -{" "}
                    <h2 className="font-medium text-white">{time.end}</h2>
                  </div>
                );
              } else {
                return (
                  <div
                    key={key}
                    className="w-[120px] sm:w-[150px] md:w-[130px] lg:w-[150px] h-11 border-2 hover:border-transparent flex justify-center items-center
                        rounded-xl cursor-pointer not-selected duration-300"
                    onClick={() => clickedTime(key, time)}
                  >
                    <h2 className="font-medium text-dark-grey">{time.start}</h2>
                    - <h2 className="font-medium text-dark-grey">{time.end}</h2>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <aside className="w-full flex flex-col justify-center items-end gap-1">
        {practice?.promo ? (
          <>
            <div className="text-dark-grey text-[16px] sm:text-[20px] font-poppins font-semibold">
              Harga Promo ={" "}
              <span className="font-extrabold">
                Rp. {practice?.harga_promo.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="text-end text-[14px] md:text-[16px] font-medium font-poppins text-subtle-grey line-through">
              Harga Normal = Rp. {practice?.harga.toLocaleString("id-ID")}
            </div>
          </>
        ) : (
          <div className="text-dark-grey text-[16px] sm:text-[20px] font-poppins font-semibold">
            Harga ={" "}
            <div className="font-extrabold">
              {" "}
              Rp. {practice?.harga.toLocaleString("id-ID")}
            </div>
          </div>
        )}
        <div className="mt-[20px] text-end text-[14px] md:text-[16px] font-medium font-poppins text-subtle-grey">
          Janji temu dokter dapat dilakukan 3 jam sebelum jam praktik{" "}
        </div>
      </aside>

      <div className="flex flex-col justify-center items-end gap-2">
        <button
          className="px-16 py-2 rounded-xl bg-light-yellow hover:bg-dark-grey duration-300 text-white font-semibold"
          onClick={() => {
            handleClick([practice?.id_praktek]);
          }}
        >
          Buat Janji Temu
        </button>
        <span className="text-[14px] md:text-[16px] text-end text-base font-medium font-poppins text-red-400">
          {message}
        </span>
      </div>
    </div>
  );
};

export default TanggalTemu;
