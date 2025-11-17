import { useAtom } from "jotai";
import { GoSun } from "react-icons/go";
import { MdDarkMode } from "react-icons/md";
import { isDarkModeAtom } from "../../atom/atom";

const ControlDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button type="button" className="button__dark" onClick={handleDarkMode}>
      {isDarkMode ? (
        <MdDarkMode className="image" fill="#fff" />
      ) : (
        <GoSun className="image" fill="#000" />
      )}
    </button>
  );
};

export default ControlDarkMode;
