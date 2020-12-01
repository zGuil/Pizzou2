import React from 'react';

import './index.css';

const Modal = ({ id = 'modal', onClose = () => {}, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div id={id} className="modal" onClick={handleOutsideClick}>
      <div className="container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;