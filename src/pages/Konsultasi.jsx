import Layout from "./Layout";
import SearchBar from "../components/SearchBar";
import CardKonsul from "../components/CardKonsul";
import TitleCard from "../components/TitleCard";
import Kotak from "../components/KotakDetailKonsul";

const Konsultasi = () => {
  return (
    <Layout>
      <TitleCard>{[false, "", "Dokter Terdekat"]}</TitleCard>
      <CardKonsul />
    </Layout>
  );
};
export default Konsultasi;
