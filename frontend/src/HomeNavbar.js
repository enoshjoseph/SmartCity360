import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeNavbar.css';

function HomeNavbar() {
  const navigate = useNavigate(); // Hook for navigation

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  const handleSignClick = () => {
    navigate('/SignUp'); // Navigate to the login page
  };

  return (
    <header className='headerhome'>
      <div className="logo">SmartCity360</div>
      <nav>
        <div className="buttons">
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleSignClick}>Sign Up</button>
        </div>
      </nav>
    </header>
  );
}

export default HomeNavbar;