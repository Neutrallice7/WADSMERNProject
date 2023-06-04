import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

// Define the Users component
const Users = () => {
  // Initialize necessary state and custom hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users'
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  // Render the component JSX
  return (
    <React.Fragment>
      {/* Render the ErrorModal component to display any errors */}
      <ErrorModal error={error} onClear={clearError} />

      {/* Show a loading spinner while the request is in progress */}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {/* Display the UsersList component with the loaded users */}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

// Export the Users component
export default Users;
