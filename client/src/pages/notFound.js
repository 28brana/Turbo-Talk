// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found 😕</p>
        <p className="text-lg text-gray-600 mb-4">Looks like you took a wrong turn.</p>
        <Link to="/auth/login" className="text-blue-500 hover:underline">
          🚀 Go to Login
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
