import CategoryHeader from "./CategoryHeader";
import CategorySection from "./CategorySection";
import dummyData from "../dummyData/dummyData";

const Opinion = ({data}) => {
  return (
    <>
      <CategoryHeader data={data} />
      <CategorySection data={data} />
    </>
  );
};

export default Opinion;
