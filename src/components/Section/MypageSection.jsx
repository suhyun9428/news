import ShowInterested from '../Contents/ShowInterested';
import useHandleLogout from '../../hooks/useHandleLogout';
import { isDarkModeAtom } from '../../atom/atom';
import { useAtom } from 'jotai';
import { FiLogOut } from "react-icons/fi";

const MypageSection = () => {
  //
  const { handleLogout } = useHandleLogout();
  const [isDarkMode, ] = useAtom(isDarkModeAtom);
  const fillColor = isDarkMode ? "#fff" : "#000";

  return(
    <div className="box__mypage-container">
      <div className='box__inner'>
        <div className="box__title">
          <strong className="text__title">Preferences</strong>
        </div>
        {/* 카테고리 선택 */}
        {/* 키워드 관리 */}
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