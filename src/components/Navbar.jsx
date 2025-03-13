import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByCookie } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/userSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarMenuRef = useRef(null);
  const navbarBackdropRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (message == "Logout success" && user == null) {
      dispatch(reset());
      navigate("/login");
      window.location.reload();
    } else {
      dispatch(getUserByCookie());
    }
  }, [message]);

  // Logout
  const handlerLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Toggle menu
    const handleBurgerClick = () => {
      setMenuOpen(!menuOpen);
    };

    // Close menu
    const handleCloseMenu = () => {
      setMenuOpen(false);
    };

    const burger = document.querySelector(".navbar-burger");
    const close = document.querySelectorAll(".navbar-close");
    const backdrop = document.querySelectorAll(".navbar-backdrop");

    if (burger) {
      burger.addEventListener("click", handleBurgerClick);
    }

    close.forEach((btn) => {
      btn.addEventListener("click", handleCloseMenu);
    });

    backdrop.forEach((elem) => {
      elem.addEventListener("click", handleCloseMenu);
    });

    return () => {
      if (burger) {
        burger.removeEventListener("click", handleBurgerClick);
      }

      close.forEach((btn) => {
        btn.removeEventListener("click", handleCloseMenu);
      });

      backdrop.forEach((elem) => {
        elem.removeEventListener("click", handleCloseMenu);
      });
    };
  }, [menuOpen]);

  return (
    <section>
      <nav className="relative px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex justify-center items-center space-x-2">
          <img src="/logo_petku.svg" className="w-[60px]"></img>
        </Link>
        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-[#ffa500] p-3">
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <ul className="hidden lg:flex lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <Link
            to="/"
            className="font-poppins text-slate-900 font-[400] hover:text-yellow-500 hover:underline hover:no-underline"
          >
            Home
          </Link>
          <Link
            to="/konsultasi"
            className="font-poppins text-slate-900 font-[400] hover:text-yellow-500 hover:underline hover:no-underline"
          >
            Konsultasi
          </Link>
          {user?.role == "pelanggan" ? (
            <Link
              to="/hewan"
              className="font-poppins text-slate-900 font-[400] hover:text-yellow-500 hover:underline hover:no-underline"
            >
              HewanKu
            </Link>
          ) : user?.role == "dokter" ? (
            <Link
              to="/praktek"
              className="font-poppins text-slate-900 font-[400] hover:text-yellow-500 hover:underline hover:no-underline"
            >
              PraktekKu
            </Link>
          ) : (
            <></>
          )}
          {user?.role == "pelanggan" ? (
            <Link
              to="/pembayaran"
              className="font-poppins text-slate-900 font-[400] hover:text-yellow-500 hover:underline hover:no-underline"
            >
              Riwayat pembayaran
            </Link>
          ) : (
            <></>
          )}
          {user ? (
            <>
              <Link
                to="/setting"
                className="font-poppins text-slate-900 font-[400] hover:text-yellow-500 hover:underline hover:no-underline"
              >
                Pengaturan
              </Link>
              <p className="font-poppins cursor-pointer inline-block text-slate-900 font-[400] hover:text-yellow-500 hover:underline hover:no-underline">
                Halo {user.username.split(" ")[0]}
              </p>
              <button
                className="text-slate-900 hover:text-white duration-300 border-2 border-yellow-500 w-24 h-12 rounded-full hover:bg-yellow-500"
                onClick={handlerLogout}
              >
                <div className="font-[400] font-poppins ">Logout</div>
              </button>
            </>
          ) : (
            <button className="text-slate-900 hover:text-white duration-300 border-2 border-yellow-500 w-24 h-12 rounded-full hover:bg-yellow-500 ">
              <Link to="/login" className="font-poppins font-[400]">
                Login
              </Link>
            </button>
          )}
        </ul>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar-menu relative z-50">
          <div
            ref={navbarBackdropRef}
            className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
          ></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto duration-300">
            <div className="flex items-center mb-8">
              <a className="mr-auto text-3xl font-bold leading-none" href="#">
                <img src="/logo_petku.svg" className="w-[60px]"></img>
              </a>
              <button className="navbar-close">
                <svg
                  className="h-6 w-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center gap-6">
              <Link
                to="/"
                className="font-poppins text-slate-900 font-[400] hover:text-yellow-500 hover:underline hover:no-underline"
              >
                Home
              </Link>
              <Link
                to="/konsultasi"
                className="font-poppins text-slate-900 font-[400] hover:text-yellow-500 hover:underline hover:no-underline"
              >
                Konsultasi
              </Link>
              {user?.role == "pelanggan" ? (
                <Link
                  to="/hewan"
                  className="font-poppins text-slate-900 font-[400] hover:text-yellow-500 hover:underline hover:no-underline"
                >
                  HewanKu
                </Link>
              ) : user?.role == "dokter" ? (
                <Link
                  to="/praktek"
                  className="font-poppins text-slate-900 font-[400] hover:text-yellow-500 hover:underline hover:no-underline"
                >
                  PraktekKu
                </Link>
              ) : (
                <></>
              )}

              {user?.role == "pelanggan" ? (
                <Link
                  to="/pembayaran"
                  className="font-poppins text-slate-900 font-[400] hover:text-yellow-500 hover:underline hover:no-underline"
                >
                  Riwayat pembayaran
                </Link>
              ) : (
                <></>
              )}

              {user ? (
                <>
                  <Link
                    to="/setting"
                    className="font-poppins text-slate-900 font-[400] hover:text-yellow-500 hover:underline hover:no-underline"
                  >
                    Pengaturan
                  </Link>
                  <p className="font-poppins cursor-pointer inline-block text-slate-900 font-[400] hover:text-yellow-500 hover:underline hover:no-underline">
                    Halo {user.username.split(" ")[0]}
                  </p>
                  <button
                    className="text-slate-900 hover:text-white duration-300 border-2 border-yellow-500 w-24 h-12 rounded-full hover:bg-yellow-500"
                    onClick={handlerLogout}
                  >
                    <div className="font-poppins font-[400]">Logout</div>
                  </button>
                </>
              ) : (
                <button className="text-slate-900 hover:text-white duration-300 border-2 border-yellow-500 w-24 h-12 rounded-full hover:bg-yellow-500">
                  <Link to="/login" className="font-poppins font-[400]">
                    Login
                  </Link>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </section>
  );
};

export default Navbar;
