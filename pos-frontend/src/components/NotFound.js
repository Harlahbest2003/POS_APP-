// src/components/NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div className="container">
      <h1 className="mt-4">404 - Not Found</h1>
      <p className="lead">The page you are looking for does not exist.</p>
      <p>Return to <a href="/">Home</a>.</p>
    </div>
  );
};

export default NotFound;
