import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

const UserItem = props => {
  return (
    <li className="user-item">
      {/* Card to display the user item */}
      <Card className="user-item__content">
        {/* Link to the user's places page */}
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            {/* Display the user's avatar */}
            <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.name} />
          </div>
          <div className="user-item__info">
            {/* Display the user's name */}
            <h2>{props.name}</h2>
            {/* Display the number of places the user has */}
            <h3>
              {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
