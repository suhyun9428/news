const CategorySection = () => {
  return (
    <div className="box__category-contents">
      <h3 className="text__title">사설</h3>
      <div className="box__inner">
        <ul className="list__articles">
          <li className="list-item">
            <a href="#" className="link__article">
              <div className="box__image">
                <img
                  className="image"
                  src="//dummyimage.com/560x374/000/fff"
                  alt=""
                />
              </div>
              <div className="box__info">
                <strong className="text__ttile">
                  여당 법사위원장의 ‘차명 주식거래’ 진상 밝히고 책임 물어야
                </strong>
                <span className="text__description">
                  이춘석 국회 법제사법위원장이 국회 본회의장에서 차명으로 주식을
                  거래했다는 의혹이 5일 제기됐다. 정청래 더불어민주당 대표는 당
                  차원의 긴급 진상조사를 지시했다. 차명거래 의혹을 부인하며
                  성실히 조사를 받겠다던 이 위원장은 이날 밤 법사위원장직을
                  사임하고 전격 탈당했다. 국회의원이 본회의 도중 주식거래를 한
                  것도 부적절하지만, 차명거래라면 현행법을 위반한 명백한 범죄
                  행위다. 법치 수호 책무를 진 법사위원장으로선 더욱 해선 안 될
                  행위다. 국회 차원의 철저한 조사는 물론 형사적 절차에 따라
                  진상을 규명하고 책임을 물어야 한다.
                </span>
              </div>
            </a>
          </li>
          <li className="list-item">
            <a href="#" className="link__article">
              <div className="box__image">
                <img
                  className="image"
                  src="//dummyimage.com/560x374/000/fff"
                  alt=""
                />
              </div>
              <div className="box__info">
                <strong className="text__ttile">
                  실체 드러난 삼부토건 주가조작, 이게 ‘국정농단’이다
                </strong>
                <span className="text__description">
                  김건희씨 관련 의혹을 수사 중인 민중기 특별검사팀이 삼부토건
                  이일준 회장과 이응근 전 대표이사를 지난 1일 자본시장법 위반
                  혐의로 구속기소했다. 수사 개시 한 달 만에 기소한 첫 사례다.
                  이들은 삼부토건이 우크라이나 재건 사업을 추진할 것처럼
                  투자자들을 속여 주가를 띄운 뒤 주식을 팔아 369억원의
                  부당이득을 챙긴 혐의를 받는다. 의혹이 무성하던 삼부토건
                  주가조작의 실체가 확인된 것이다.
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default CategorySection;
