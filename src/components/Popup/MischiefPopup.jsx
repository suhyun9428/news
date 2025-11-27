import { useAtom } from "jotai";
import { mischiefPopupAtom } from "../../atom/atom";

const MischiefPopup = () => {
  const [isOpen, setIsOpen] = useAtom(mischiefPopupAtom);

  return (
    <div className="box__mischief-overlay" role="dialog" aria-modal="true">
      <div className="box__layer-mischief">
        <div className="box__layer-header">
          <span className="text__icon">⚠️</span>
          <h3 className="text__title">System Alert</h3>
        </div>
        <div className="box__layer-body">
          <p className="text__message">detected!<br/>You’ve been hacked! 💻💀</p>
        </div>
        <div className="box__layer-footer">
          <button
            type="button"
            className="button__confirm"
            onClick={() => {
              const today = new Date().toISOString().slice(0, 10);
              localStorage.setItem('popupLastSeen', today);
              setIsOpen(false);
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default MischiefPopup;
