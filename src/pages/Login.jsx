import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/userSlice";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { isSuccess, message } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (isSuccess && message == "Login success") {
      navigate("/");
    }
  }, [isSuccess, message]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(login({ email, password }));
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  return (
    <section className="w-full h-[100vh] flex justify-center items-center">
      <div
        className="h-auto w-[96%] flex flex-col gap-8 mx-4 mt-[30px] p-4 justify-between items-center
              shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-3xl md:p-8 md:mx-auto md:w-2/3 lg:flex-row"
      >
        {/* Gambar */}
        <div className="w-[100%] lg:w-[50%] h-[200px] sm:h-[400px] rounded-3xl flex items-center justify-center">
          {/* Ganti dengan gambar yang diinginkan */}

          <img
            src="https://images.pexels.com/photos/1975989/pexels-photo-1975989.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="h-full w-full rounded-3xl object-cover"
          ></img>
        </div>

        {/* Teks */}
        <div className="w-[100%] lg:w-[50%] flex flex-col justify-between">
          <h2 className="text-center md:text-left font-[650] text-2xl sm:text-3xl md:text-left md:text-3xl font-poppins">
            Halo Selamat datang
          </h2>
          <p className="text-md md:text-lg text-center md:text-left font-[480] text-slate-400 font-poppins">
            Login, untuk melanjutkan
          </p>

          {/* Login */}
          <form
            className="w-[100%] pt-2 flex flex-col gap-4"
            onSubmit={handlerSubmit}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <p className="text-md sm:text-lg font-[500] font-poppins">
                Email
              </p>
              <input
                type="teks"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[100%] sm:w-[74%] h-[40px] border-2 pl-4 rounded-lg font-poppins"
              ></input>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <p className="text-md sm:text-lg font-[500] font-poppins">
                Password
              </p>
              <input
                type="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[100%] sm:w-[74%] h-[40px] border-2 pl-4 rounded-lg font-poppins"
              ></input>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="px-6 py-2 bg-light-yellow hover:bg-subtle-grey duration-300 transition ease-in-out text-white font-semibold rounded-xl shadow-lg mb-4 font-poppins"
              >
                Login
              </button>

              <p className="text-lg font-[300]">{message.split(".")[0]}</p>
            </div>
          </form>

          <p className="text-[16px] font-[600] font-poppins">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-subtle-yellow transition ease-in-out hover:text-dark-grey duration-300 font-poppins"
            >
              Buat disini!
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
