import ShowInterested from '../Contents/ShowInterested';
import useHandleLogout from '../../hooks/useHandleLogout';
import { isDarkModeAtom } from '../../atom/atom';
import { useAtom } from 'jotai';
import { FiLogOut } from "react-icons/fi";
import dummyData from '../../dummyData/dummyData';

const MypageSection = () => {
  // 1. 마이페이지에서 관심 카테고리 설정하고
  const { handleLogout } = useHandleLogout();
  const [isDarkMode, ] = useAtom(isDarkModeAtom);
  const fillColor = isDarkMode ? "#fff" : "#000";
  const MenuBar = dummyData.MenuBar;
  
  return(
    <div className="box__mypage-container">
      <div className='box__inner'>
        <div className="box__title">
          <strong className="text__title">Preferences</strong>
        </div>
        <div className='box__select-category'>
          {MenuBar.map((item, idx) => {
            return(
              <div key={`category-${idx}`} className='box__category'>
                <label htmlFor={`checkbox-${idx}`}>
                  <input type="checkbox" className='form__checkbox' id={`checkbox-${idx}`}/>
                  <span className="text">{item.id}</span>
                </label>
              </div>
            )
          })}
        </div>
      </div>
      <div className='box__inner'>
        <ShowInterested />
      </div>
      <div className='box__inner'>
        <div className="box__title">
          <strong className="text__title">Account Settings</strong>
        </div>
        <ul className='list__mypage'>
          <li className='list-item'>
            <button
              type="button"
              className="button__logout"
              style={{ color: fillColor }}
              onClick={handleLogout}
              >
                <span className="text">Log out</span>
                <FiLogOut className="image" />                    
            </button>
          </li>
          <li className='list-item'>
            <button type='button'>
              <span className="text">Withdraw</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default MypageSection;