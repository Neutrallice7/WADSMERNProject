import React from 'react';

import './Card.css';

// Draw cards to make it look pretty
const Card = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
