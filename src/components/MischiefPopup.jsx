const MischiefPopup = () => {
  <div className="mischief-overlay" role="dialog" aria-modal="true">
    <div className="mischief-card">
      <div className="mischief-header">
        <span className="mischief-badge">⚠️</span>
        <h3 className="mischief-title">System Alert</h3>
      </div>
      <div className="mischief-body">
        <p className="mischief-msg">detected! You’ve been hacked! 💻💀</p>
      </div>
      <div className="mischief-footer">
        <button
          type="button"
          className="mischief-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          OK
        </button>
      </div>
    </div>
  </div>;
};

export default MischiefPopup;
