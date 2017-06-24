import React from 'react';

const Modal = (props) => {
  return(
    <div className="modal">
      <div className="modal-backdrop"></div>
      <div className="col-md-6 modal-body">
        <div className="panel panel-error">
          <div className="panel-heading">{props.header || ""}</div>
          <div className="panel-body">{props.body || ""}</div>
          <div className="panel-footer">
            <button className="btn btn-short" onClick={props.onClick}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;