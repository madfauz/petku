import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [response, setResponse] = React.useState("");
  const [role, setRole] = React.useState("pelanggan");
  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      const post = await axios.post(`http://localhost:5000/register`, {
        username: username,
        email: email,
        password: password,
        confirm_password: confirmPassword,
        role: role,
      });
      setResponse(post.data.message);
      navigate("/login");
    } catch (err) {
      setResponse(err.response.data.errors);
    }
  };

  return (
    <section className="w-full h-[100vh] flex justify-center items-center">
      <div
        className="h-auto w-[96%] flex flex-col gap-8 mx-4 p-4 justify-between items-center
                shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-3xl md:p-8 md:mx-auto md:w-10/12 lg:flex-row"
      >
        {/* Gambar */}
        <div className="w-[100%] lg:w-[40%] h-[160px] lg:h-[400px] rounded-3xl flex items-center justify-center">
          {/* Ganti dengan gambar yang diinginkan */}

          <img
            src="https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="h-full w-full rounded-3xl object-cover"
          ></img>
        </div>

        {/* Teks */}
        <div className="w-[100%] lg:w-[60%]">
          <h2 className="font-[650] text-center md:text-left text-2xl sm:text-3xl font-poppins">
            Halo Ayo Mulai
          </h2>
          <p className="text-md md:text-lg text-center md:text-left font-[480] text-slate-400 font-poppins">
            Daftar, untuk melanjutkan
          </p>

          {/* Register */}
          <form
            className="pt-4 pb-4 flex flex-col gap-2"
            onSubmit={handlerSubmit}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <label
                for="username"
                className="text-md sm:text-lg font-[500] font-poppins"
              >
                Username
              </label>
              <input
                id="username"
                type="teks"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-[100%] sm:w-[360px] h-[40px] border-2 pl-4  rounded-lg font-poppins"
              ></input>
            </div>
            <div className="flex flex-col justify-between items-start gap-2 sm:items-center sm:flex-row">
              <label
                for="email"
                className="text-md sm:text-lg font-[500] font-poppins"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="nama@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[100%] sm:w-[360px]  h-[40px] border-2 pl-4 rounded-lg font-poppins"
              ></input>
            </div>

            <div className="flex flex-col justify-between items-start gap-2 sm:items-center sm:flex-row">
              <label
                for="password"
                className="text-md sm:text-lg font-[500] font-poppins"
              >
                Password
              </label>
              <input
                id="password"
                type="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[100%] sm:w-[360px]  h-[40px] border-2 pl-4 rounded-lg font-poppins"
              ></input>
            </div>
            <div className="flex flex-col justify-between items-start gap-2 sm:items-center sm:flex-row">
              <label
                for="confirmPassword"
                className="text-md sm:text-lg font-[500] font-poppins"
              >
                Konfirmasi Password
              </label>
              <input
                id="confirmPassword"
                type="Password"
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-[100%] sm:w-[360px]  h-[40px] border-2 pl-4 rounded-lg font-poppins"
              ></input>
            </div>
            <div className="flex flex-col justify-between items-start gap-2 sm:items-center sm:flex-row">
              <label
                className="text-md sm:text-lg font-[500] font-poppins"
                for="kategori"
              >
                Kategori
              </label>
              <select
                name=""
                id="kategori"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-[100%] sm:w-[360px]  h-[40px] border-2 pl-4 rounded-lg font-poppins"
              >
                <option value="pelanggan">Pelanggan</option>
                <option value="dokter">Dokter</option>
              </select>
            </div>
            <div className="mt-2 flex flex-col justify-between items-start gap-2 sm:items-center sm:mt-0 sm:flex-row">
              <button
                type="submit"
                className="px-6 py-2 bg-light-yellow hover:bg-subtle-grey duration-300 transition ease-in-out rounded-xl text-white font-semibold shadow-lg w-[100px] font-poppins"
              >
                Daftar
              </button>
              <p className="text-lg font-[300]">{response.split(".")[0]}</p>
            </div>
          </form>

          <p className="text-[16px] font-[600] font-poppins">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-subtle-yellow transition ease-in-out hover:text-dark-grey duration-300 font-poppins"
            >
              Login disini!
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
