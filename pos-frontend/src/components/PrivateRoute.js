import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = React.useContext(AuthContext);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
