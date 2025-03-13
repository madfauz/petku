import Layout from "./Layout";
import TitleCard from "../components/TitleCard";
import SettingForm from "../components/SettingForm";

const Setting = () => {
  return (
    <Layout>
      <TitleCard>{[true, "/", "Kembali"]}</TitleCard>
      <div className="w-[92%] md:w-[86%] xl:w-[80%]">
        <SettingForm />
      </div>
    </Layout>
  );
};
export default Setting;
