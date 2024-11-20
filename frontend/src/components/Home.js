// src/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate for navigation in React Router v6
import './Home.css';

const HomePage = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleSignInClick = () => {
    navigate('/login'); // Redirect to the Login page
  };

  const handleSignUpClick = () => {
    navigate('/register'); // Redirect to the Register page
  };

  return (
    <div className="container">
      <h1>Welcome to Our Website</h1>
      <div className="button-container">
        <button className="btn sign-in" onClick={handleSignInClick}>
          Sign In
        </button>
        <button className="btn sign-up" onClick={handleSignUpClick}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default HomePage;
