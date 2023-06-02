import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  // Initialize state variables
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // useRef to store active HTTP requests
  const activeHttpRequests = useRef([]);

  // useCallback to create a stable sendRequest function
  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  // Function to clear the error state
  const clearError = () => {
    setError(null);
  };

  // Cleanup function to abort active requests on component unmount
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  // Return the state variables and functions as an object
  return { isLoading, error, sendRequest, clearError };
};
