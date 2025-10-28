import HotKeywords from "../Contents/HotKeywords";
import BreakingNews from "../Contents/BreakingNews";
import MainNews from "../Contents/MainNews";
import dummyData from "../../dummyData/dummyData";

const GeneralSection = ({ data }) => (
  <>
    <HotKeywords data={dummyData.HotKeywords} />
    <BreakingNews data={data} />
    <MainNews data={data} />
  </>
);

export default GeneralSection;
