import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

// For closing the sidebar in mobile
const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
