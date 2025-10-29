import Issue from "../Contents/Issue";

const KeywordSection = ({ data }) => {
  if (!data?.length) {
    return (
      <div className="box__noresult">
        <p className="text">검색 결과가 없습니다 😢</p>
      </div>
    );
  }

  return <Issue data={data} />;
};

export default KeywordSection;
