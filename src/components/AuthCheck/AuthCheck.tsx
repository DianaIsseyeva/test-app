import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckAuthQuery } from '../../services';

const AuthCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, error, isLoading } = useCheckAuthQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        navigate('/sign-in');
      } else if (!data) {
        navigate('/sign-up');
      }
    }
  }, [data, error, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthCheck;
