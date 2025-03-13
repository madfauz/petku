import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAnimalsByIdPelanggan } from "../features/animalSlice";
import { getAllMetode } from "../features/metodeSlice";
import { reset, postJadwal } from "../features/jadwalSlice";
import "../style/TanggalTemu.css";

const KotakKonfirmasiDiri = ({ data, dateTime }) => {
  const [message, setMessage] = useState("");
  const { practice, user } = data;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Date Time
  const dateMerge = dateTime?.day;
  const dateToString = dateMerge?.toDateString();
  const dateFormat = dateToString?.split(" ").join(" ");

  const time = dateTime?.time;
  let day = dateFormat?.split(" ")[0];
  let month = dateFormat?.split(" ")[1];
  let date = dateFormat?.split(" ")[2];
  let year = dateFormat?.split(" ")[3];

  switch (day) {
    case "Sun":
      day = "Minggu";
      break;
    case "Mon":
      day = "Senin";
      break;
    case "Tue":
      day = "Selasa";
      break;
    case "Wed":
      day = "Rabu";
      break;
    case "Thu":
      day = "Kamis";
      break;
    case "Fri":
      day = "Jumat";
      break;
    default:
      day = "Sabtu";
      break;
  }

  switch (month) {
    case "Jan":
      month = "Januari";
      break;
    case "Feb":
      month = "Februari";
      break;
    case "Mar":
      month = "Maret";
      break;
    case "Apr":
      month = "April";
      break;
    case "May":
      month = "Mei";
      break;
    case "Jun":
      month = "Juni";
      break;
    case "Jul":
      month = "Juli";
      break;
    case "Aug":
      month = "Agustus";
      break;
    case "Sep":
      month = "September";
      break;
    case "Oct":
      month = "Oktober";
      break;
    case "Nov":
      month = "November";
      break;
    default:
      month = "Desember";
      break;
  }

  const dateTimeFormat = {
    date: `${day}, ${date} ${month} ${year}`,
    time: `${time}`,
  };

  function formatDateTime(dateTimeBefore) {
    const time = dateTimeBefore.time;
    const formated = {
      date: dateTimeBefore.date,
      time: time.replaceAll(":", "."),
    };
    return JSON.stringify(formated);
  }

  // Jadwal Temu
  let {
    isError,
    isSuccess,
    message: messageJadwal,
  } = useSelector((state) => state.jadwal);

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (messageJadwal !== "") {
      setMessage(messageJadwal);
    }

    if (messageJadwal == "Data berhasil ditambahkan") {
      dispatch(reset());
      navigate(`/konsultasi/${idPraktek}/selesai`);
      window.location.reload();
    }
  }, [messageJadwal]);

  // Metode Pembayaran
  let { metode } = useSelector((state) => state.metode);
  const [metodeSelected, setMetodeSelected] = useState(null);
  const [biayaPembayaran, setBiayaPembayaran] = useState(0);
  const [totalTagihan, setTotalTagihan] = useState(0);

  useEffect(() => {
    dispatch(getAllMetode());
  }, []);

  // Hewan
  const [animalsPelanggan, setAnimalsPelanggan] = useState(null);
  const [idHewan, setIdHewan] = useState("");
  const idPraktek = practice?.id_praktek;
  let { animalsIdPelanggan } = useSelector((state) => state.animal);

  useEffect(() => {
    if (user) {
      dispatch(getAnimalsByIdPelanggan(user.id_user));
    }
  }, [user]);

  useEffect(() => {
    if (animalsIdPelanggan) {
      setAnimalsPelanggan(animalsIdPelanggan.hewan);
      setIdHewan(animalsIdPelanggan.hewan[0].id_hewan);
    }
  }, [animalsIdPelanggan]);

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      setMessage("");

      dispatch(
        postJadwal({
          id_praktek: idPraktek,
          id_hewan: idHewan,
          waktu_dipilih_pelanggan: formatDateTime(dateTimeFormat),
        })
      );
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const username = user?.username?.split(" ");
    function generateLastName() {
      const sliceLastName = username?.slice(1);
      let lastName = "";
      if (sliceLastName) {
        for (let i = 0; i < sliceLastName.length; i++) {
          lastName =
            lastName == ""
              ? sliceLastName[i]
              : lastName + " " + sliceLastName[i];
        }
      }

      return lastName;
    }
    try {
      const { data } = await axios.post("http://localhost:5000/transaction", {
        amount: practice?.promo ? practice?.harga_promo : practice?.harga,
        first_name: username[0],
        last_name: generateLastName(),
        email: user?.email,
        phone: user?.pelanggan?.kontak,
      });

      // Jalankan Snap popup
      window.snap.pay(data.token, {
        onSuccess: function (result) {
          navigate(`/konsultasi/${idPraktek}/selesai`);
        },
        onPending: function (result) {
          alert("Waiting for payment! " + JSON.stringify(result));
        },
        onError: function (result) {
          alert("Payment failed! " + JSON.stringify(result));
        },
        onClose: function () {
          navigate(`/konsultasi/${idPraktek}/konfirmasi`);
        },
      });
    } catch (error) {
      console.error("Payment Error:", error.message);
    }
  };

  return (
    <div className="flex w-full md:w-1/2 h-full flex-col justify-start items-end gap-4">
      <div className="w-full flex gap-6 flex-col justify-center items-center">
        <div
          className="flex flex-col p-4 gap-4 bg-white w-full h-auto md:w-[300px] lg:w-[500px] rounded-xl
            shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] pb-4"
        >
          <p className="text-xl font-bold font-poppins text-dark-grey">
            Konfirmasi Data Diri
          </p>

          <div
            className="flex flex-col gap-2 justify-start w-full h-auto"
            id="date"
          >
            <label
              htmlFor="namaPemilik"
              className="text-md font-medium font-poppins text-dark-grey"
            >
              Nama Pemilik
            </label>
            <input
              type="text"
              id="namaPemilik"
              value={user?.username}
              className="rounded-lg py-2 px-4 w-full h-auto border-subtle-grey border-[1px]"
              disabled
            />
          </div>
          <div
            className="flex flex-col gap-2 justify-start w-full h-auto"
            id="date"
          >
            <label
              htmlFor="kontak"
              className="text-md font-medium font-poppins text-dark-grey"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={user?.email}
              className="rounded-lg py-2 px-4 w-full h-auto border-subtle-grey border-[1px]"
              disabled
            />
          </div>
          <div
            className="flex flex-col gap-2 justify-start w-full h-auto"
            id="date"
          >
            <label
              htmlFor="kontak"
              className="text-md font-medium font-poppins text-dark-grey"
            >
              Nomor Telepon
            </label>
            <input
              type="text"
              id="kontak"
              value={user?.pelanggan.kontak}
              className="rounded-lg py-2 px-4 w-full h-auto border-subtle-grey border-[1px]"
              disabled
            />
          </div>
          <div
            className="flex flex-col gap-2 justify-start w-full h-auto"
            id="date"
          >
            <label
              htmlFor="alamat"
              className="text-md font-medium font-poppins text-dark-grey"
            >
              Alamat
            </label>
            <input
              type="text"
              id="alamat"
              value={user?.pelanggan.alamat}
              className="rounded-lg py-2 px-4 w-full h-auto border-subtle-grey border-[1px]"
              disabled
            />
          </div>
          <div className="flex flex-col gap-2 justify-start w-full h-auto">
            <label
              htmlFor="jenis"
              className="text-md font-medium font-poppins text-dark-grey"
            >
              Hewan yang Dirujuk
            </label>
            {/* Select option */}
            <div className="relative w-full">
              <select
                name="jenis"
                id="jenis"
                className="border-[1px] border-subtle-grey rounded-xl w-full py-2 px-4 appearance-none"
                onChange={(event) => setIdHewan(event.target.value)}
                value={idHewan}
              >
                {animalsPelanggan !== null ? (
                  animalsPelanggan.map((hewan, index) => (
                    <option key={index} value={hewan.id_hewan}>
                      {hewan.nama}
                    </option>
                  ))
                ) : (
                  <option disabled>Kamu belum punya hewan</option>
                )}
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
          </div>
          <div className="flex flex-col gap-2 justify-start w-full h-auto">
            <label
              htmlFor="metodePembayaran"
              className="text-md font-medium font-poppins text-dark-grey"
            >
              Ringkasan Transaksi
            </label>
            <div className="w-full flex justify-between">
              <h4 className="text-[14px] sm:text-[18px] md:text-[14px] xl:text-[18px]  font-normal font-poppins text-subtle-grey">
                Total Harga
              </h4>
              <h4 className="text-[14px] sm:text-[18px] md:text-[14px] xl:text-[18px] font-semibold font-poppins text-dark-grey">
                Rp.{" "}
                {practice?.promo
                  ? practice?.harga_promo.toLocaleString("id-ID")
                  : practice?.harga.toLocaleString("id-ID")}
              </h4>
            </div>
            <div className="w-full flex flex-row-reverse justify-between">
              <h4 className="text-[14px] md:text-[16px] font-normal font-poppins text-subtle-grey">
                Belum termasuk pajak Pembayaran
              </h4>
            </div>
          </div>
        </div>
      </div>
      <h4 className="text-[12px] sm:text-[14px] md:text-[16px] text-end font-medium font-poppins text-subtle-grey">
        Janji temu dokter dapat dilakukan 3 jam sebelum jam praktik
      </h4>
      <h4 className="text-[12px] sm:text-[14px] md:text-[16px] text-end font-medium font-poppins text-red-400">
        {message}
      </h4>
      <form className="w-full flex justify-center items-center">
        <button
          type="submit"
          // onClick={onSubmit}
          onClick={handlePayment}
          className="w-full text-center px-16 py-2 rounded-xl bg-light-yellow hover:bg-dark-grey duration-300 text-white font-semibold"
        >
          Buat Janji Temu
        </button>
      </form>
    </div>
  );
};

export default KotakKonfirmasiDiri;
