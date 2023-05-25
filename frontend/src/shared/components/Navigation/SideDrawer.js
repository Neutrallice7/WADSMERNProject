import React from 'react';
import ReactDOM from 'react-dom';

import './SideDrawer.css';

// Draw the side draw for mobile
const SideDrawer = props => {
  const content = <aside className="side-drawer">{props.children}</aside>;

  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;