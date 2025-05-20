import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className='headermain'>
      <div className="logo">SmartCity360</div>
      <nav>
        {/*<a href="#">Home</a>*/}
        {/*<a href="">Home</a>*/}
        <Link to="/Tourpage">Home</Link>
      <Link to="/EventPage">Events</Link>
      </nav>
    </header>
  );
}

export default Navbar;
