import Opinion from "../Contents/Opinion";
import Column from "../Contents/Column";
import dummyData from "../../dummyData/dummyData";

const OpinionSection = ({ categoryList }) => {
  return (
    <>
      <Opinion data={categoryList} />
      <Column data={dummyData.Column} />
    </>
  );
};

export default OpinionSection;
