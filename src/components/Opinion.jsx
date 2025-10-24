import CategoryHeader from "./CategoryHeader";
import CategorySection from "./CategorySection";

const Opinion = ({data}) => {
  return (
    <>
      <CategoryHeader data={data} />
      <CategorySection data={data} />
    </>
  );
};

export default Opinion;
