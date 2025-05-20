import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    userId: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(''); // Clear previous error

    axios
      .post('http://localhost:8080/loginUser', values)
      .then((res) => {
        console.log('Login response:', res.data);

        // Adjust this condition based on your actual API response
        if (res.data === true) {
          navigate('/Tourpage');
        } else {
          setError('No record exists'); // Show error below form
        }
      })
      .catch((err) => {
        console.error('Login error:', err);
        setError('Something went wrong. Please try again.');
      });
  };

  return (
    <div>
      <div className='main'>
      <section>
        <div className="leaves">
          <div className="set">
            <div><img src="login_img/leaf_01.png" alt="Leaf 1" /></div>
            <div><img src="login_img/leaf_02.png" alt="Leaf 2" /></div>
            <div><img src="login_img/leaf_03.png" alt="Leaf 3" /></div>
            <div><img src="login_img/leaf_04.png" alt="Leaf 4" /></div>
            <div><img src="login_img/leaf_01.png" alt="Leaf 1" /></div>
            <div><img src="login_img/leaf_02.png" alt="Leaf 2" /></div>
            <div><img src="login_img/leaf_03.png" alt="Leaf 3" /></div>
            <div><img src="login_img/leaf_04.png" alt="Leaf 4" /></div>
          </div>
        </div>

        <img src="login_img/bg.jpg" className="bg" alt="Background" />
        <img src="login_img/girl.png" className="girl" alt="Girl" />
        <img src="login_img/trees.png" className="trees" alt="Trees" />

        <div className="login">
          <h2>Sign In</h2>
          <form action="" onSubmit={handleSubmit}>

          <div className="inputBox">
          <input type="text" placeholder="Username" name="userId" onChange={handleInput} />
          </div>

          <div className="inputBox">
          <input id="password" type="password" name="password" placeholder="Password" onChange={handleInput} />
          </div>

          <div className="inputBox">
            <input type="submit" value="Login" id="btn" />
          </div>

          <div className="group">
            <a href="#">Forget Password</a>
            <Link to="/signup">Sign Up</Link>
          </div>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </section>
      </div>
    </div>
  );
}

export default Login;
