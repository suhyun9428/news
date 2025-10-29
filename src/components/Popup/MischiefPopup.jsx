const MischiefPopup = () => {
  return (
    <div className="box__mischief-overlay" role="dialog" aria-modal="true">
      <div className="box__layer-mischief">
        <div className="box__layer-header">
          <span className="text__icon">⚠️</span>
          <h3 className="text__title">System Alert</h3>
        </div>
        <div className="box__layer-body">
          <p className="text__message">detected! You’ve been hacked! 💻💀</p>
        </div>
        <div className="box__layer-footer">
          <button
            type="button"
            className="button__confirm"
            // onClick={() => window.alert('메롱')}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default MischiefPopup;
