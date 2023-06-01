import React from 'react';

import UsersList from '../components/UsersList';

// Users and their data
const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Dafa Syaidina',
      image:
        'https://i.pinimg.com/736x/0a/77/ab/0a77ab9b741887432031c9d0670ac3f3.jpg',
      places: 2
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
