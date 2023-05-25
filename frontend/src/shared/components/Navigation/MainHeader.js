import React from 'react';

import './MainHeader.css';

// Draws the main header
const MainHeader = props => {
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
