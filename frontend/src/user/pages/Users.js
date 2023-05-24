import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS=
    [
    {
        id: 'u1', 
        name: 'Max Schwarz', 
        image: 'https://images.unsplash.com/photo-1593642532452-9d5c0b2b0b2a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFtaWx5JTIwcGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80', 
        places: 3
    }
    ];

    return <UsersList items={USERS} />;
    

} 

export default Users;