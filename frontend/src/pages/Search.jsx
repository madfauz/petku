import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "./Layout";
import SearchBar from "../components/SearchBar";
import Slider from "../components/Slider";
import CardKonsulSearch from "../components/CardKonsulSearch";
import TitleCard from "../components/TitleCard";
import OptionButton from "../components/OptionButton";
import { useDispatch, useSelector } from "react-redux";
import { SearchResults } from "../features/doctorSlice";

const Search = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const dataParams = queryParams.get("data");
  const { doctors } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(SearchResults(dataParams));
  }, []);

  return (
    <Layout>
      <SearchBar>Mau cari apa...</SearchBar>
      <OptionButton>
        {["Kucing", "Anjing", "Burung", "Kelinci", "Hamster", "Iguana"]}
      </OptionButton>
      <h3 className="font-poppins text-dark-grey">
        Hasil pencarian : {dataParams}
      </h3>
      <CardKonsulSearch data={doctors?.data} />
    </Layout>
  );
};

export default Search;
