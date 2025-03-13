import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByCookie, editById, reset } from "../features/userSlice";

const SettingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );
  const [username, setUsername] = useState("");
  const [kontak, setKontak] = useState("");
  const [alamat, setAlamat] = useState("");
  const [urlPhoto, setUrlPhoto] = useState(null);
  const [pengalaman, setPengalaman] = useState("");
  const [namaKlinik, setKlinik] = useState("");
  const [previewPhoto, setPreviewPhoto] = useState("");

  useEffect(() => {
    dispatch(reset());
    dispatch(getUserByCookie());
  }, []);

  useEffect(() => {
    if (user == null && isError) {
      navigate("/login");
    } else if (user != null) {
      setData();
    }
  }, [user]);

  const setData = () => {
    const role = user.role;
    setUsername(user.username);
    setKontak(user[role].kontak);
    setAlamat(user[role].alamat);
    setPreviewPhoto(user[role].url_photo);
    if (role == "dokter") {
      setPengalaman(user[role].pengalaman);
      setKlinik(user[role].nama_klinik);
    }
  };

  const loadImage = (event) => {
    const image = event.target.files[0];
    setUrlPhoto(image);
    setPreviewPhoto(URL.createObjectURL(image));
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = {
        id_user: user.id_user,
        role: user.role,
        username,
        kontak,
        alamat,
        url_photo: urlPhoto,
      };
      if (user.role === "dokter") {
        content.pengalaman = pengalaman;
        content.nama_klinik = namaKlinik;
      }

      await dispatch(editById(content)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return user !== null ? (
    <form
      action=""
      onSubmit={handlerSubmit}
      className="h-auto w-full sm:w-[550px] flex flex-col gap-4 mt-[24px] mb-[40px] mx-auto p-6 sm:p-8 items-start shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-3xl"
    >
      <h2 className="text-xl sm:text-2xl font-[700]">Edit Profil</h2>
      <div className="w-full flex justify-between items-center gap-2">
        <label htmlFor="username" className="text-[16px] sm:text-lg font-[400]">
          Username{" "}
        </label>
        <input
          type="text"
          id="username"
          value={username}
          className="w-[220px] sm:w-[280px] h-[40px] border-2 rounded-lg pl-4"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="w-full flex justify-between items-center gap-2 ">
        <label htmlFor="kontak" className="text-[16px] sm:text-lg font-[400]">
          Kontak{" "}
        </label>
        <input
          type="text"
          id="kontak"
          value={kontak == "null" ? "" : kontak}
          className="w-[220px] sm:w-[280px] h-[40px] border-2 rounded-lg pl-4"
          onChange={(e) => setKontak(e.target.value)}
        />
      </div>
      <div className="w-full flex justify-between items-center gap-2">
        <label htmlFor="alamat" className="text-[16px] sm:text-lg font-[400]">
          Alamat{" "}
        </label>
        <input
          type="text"
          id="alamat"
          value={alamat == "null" ? "" : alamat}
          className="w-[220px] sm:w-[280px] h-[40px] border-2 rounded-lg pl-4"
          onChange={(e) => setAlamat(e.target.value)}
        />
      </div>
      <div className="w-full flex justify-between items-center gap-2">
        <label htmlFor="foto" className="text-[16px] sm:text-lg font-[400]">
          Foto Profil
        </label>
        <div className="w-[220px] sm:w-[280px] flex flex-col gap-2">
          <img
            src={
              previewPhoto.includes("images/")
                ? `http://localhost:5000/${previewPhoto}`
                : previewPhoto
            }
            alt={"preview"}
            className="w-[100px] h-[100px]  sm:w-[200px] sm:h-[200px] rounded-full border-2 object-cover"
          />
          <input
            type="file"
            id="foto"
            className="w-[220px] sm:w-[280px] h-auto border-2 rounded-lg p-2"
            onChange={loadImage}
          />
        </div>
      </div>
      {user.role == "dokter" ? (
        <>
          <div className="w-full flex justify-between items-center gap-2">
            <label htmlFor="nama_klinik" className="text-lg font-[400]">
              Nama Klinik
            </label>
            <input
              type="text"
              id="nama_klinik"
              value={namaKlinik == "null" ? "" : namaKlinik}
              className="w-[280px] h-[40px] border-2 rounded-lg pl-4"
              onChange={(e) => setKlinik(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-between items-center gap-2">
            <label htmlFor="pengalaman" className="text-lg font-[400]">
              Pengalaman (Tahun)
            </label>
            <input
              type="text"
              id="pengalaman"
              value={pengalaman == "null" ? 0 : pengalaman}
              className="w-[280px] h-[40px] border-2 rounded-lg pl-4"
              onChange={(e) => setPengalaman(e.target.value)}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="w-full flex justify-between items-center">
        <button
          type="submit"
          className="px-6 py-2 bg-light-yellow hover:bg-dark-grey duration-300 rounded-xl text-white font-semibold shadow-lg mb-4"
        >
          Simpan
        </button>
        <p>{message}</p>
      </div>
    </form>
  ) : (
    <></>
  );
};

export default SettingForm;
