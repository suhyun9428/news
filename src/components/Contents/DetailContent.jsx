import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
// import { useDrag } form @use-gesture/
const DetailContent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // state가 없으면 홈으로
  if (!state) return navigate("/");

  const { title, content, image, url } = state;

  return (
    <div className="detail__container">
      <button
        type="button"
        className="detail__back"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack />
      </button>
      <div className="detail__image-wrapper">
        <img src={image} alt={title} className="detail__image" loading="lazy" />
      </div>
      <h1 className="detail__title">{title}</h1>
      <div className="detail__content">
        {content ? content : "내용이 제공되지 않은 기사입니다."}
      </div>
      <a
        href={url}
        className="link__article"
        target="_blank"
        rel="noopener noreferrer"
      >
        원문 기사 전체 보기
      </a>
    </div>
  );
};

export default DetailContent;
