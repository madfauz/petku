import React from "react";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="flex flex-col w-[100%] items-center justify-start min-h-screen mx-auto mb-10">
        {children}
      </main>
    </React.Fragment>
  );
};

export default Layout;
