import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";

const DetailContent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const startX = useRef(0);

  // state가 없으면 홈으로
  if (!state) return navigate("/");

  const { title, content, image, url } = state;
  const sliceContent = content.substr(0, 250);

  useEffect(() => {
    const handleStart = (e) => {
      startX.current = e.touches[0].clientX;
    };
    const handleEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const distance = endX - startX.current;

      if (distance > 80) {
        navigate(-1);
      }
    };

    document.addEventListener("touchstart", handleStart);
    document.addEventListener("touchsend", handleEnd);

    return () => {
      document.removeEventListener("touchstart", handleStart);
      document.removeEventListener("touchsend", handleEnd);
    };
  },[]);
  return (
    <div className="box__detail">
      {/* <button
        type="button"
        className="detail__back"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack />
      </button> */}
      <div className="box__image">
        <img src={image} alt={title} className="image" loading="lazy" />
      </div>
      <div className="box__contents">
        <h2 className="text__title">{title}</h2>
        <p className="text__contents">{sliceContent ? `${sliceContent}...` : "내용이 제공되지 않은 기사입니다."}</p>
        <a
          href={url}
          className="link__article"
          target="_blank"
          rel="noopener noreferrer"
        >
          View full article
          <FaArrowRight className="icon__go" />
        </a>
      </div>
    </div>
  );
};

export default DetailContent;
