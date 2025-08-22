import CategoryHeader from "./CategoryHeader";
import CategorySection from "./CategorySection";
import dummyData from "../dummyData/dummyData";

const Opinion = () => {
  return (
    <>
      <CategoryHeader data={dummyData.MenuBar} />
      <CategorySection />
    </>
  );
};

export default Opinion;
