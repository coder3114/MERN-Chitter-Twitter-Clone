import PropTypes from "prop-types";

import "../css/Modal.css";

const Modal = ({ handleClose, message, title }) => {
  const showHideClassName = message
    ? `modal display-block`
    : `modal display-none`;
  return (
    <div className={showHideClassName} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  title: PropTypes.string,
};

export default Modal;
