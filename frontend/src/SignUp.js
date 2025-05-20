import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  /*const handleSubmit = (event) => {
    event.preventDefault();
    
    // Proceed with the API call directly
    axios
      .post("http://localhost:8080/addUser", values)
      .then((res) => {
        navigate("/"); // Navigate to login page on success
      })
      .catch((err) => console.log(err));
  };*/
  const handleSubmit = (event) => {
    event.preventDefault();
  
    axios
      .post("http://localhost:8080/addUser", values)
      .then((res) => {
        alert("Signup successful! Please log in.");
        navigate("/"); // Redirect to login
      })
      .catch((err) => {
        console.log(err);
        alert("Signup failed. Please try again.");
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

        <div className="signup">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>

          <div className="inputBox">
          <input id="name" type="text" placeholder="Name" name="name" value={values.name} onChange={handleInput} />          

          </div>

          <div className="inputBox">
          <input id="email" type="email" placeholder="Email" name="email" value={values.email} onChange={handleInput} />
          </div>

          <div className="inputBox">
          <input id="password" type="password" placeholder="Password" name="password" value={values.password} onChange={handleInput} />          </div>

          <div className="inputBox">
            <input type="submit" value="Sign Up" id="btn" />
          </div>

          <div className="group">
            <a href="#">Forget Password</a>
           {/*}<a href="#">Signup</a> */}
          </div>
          </form>
        </div>
      </section>
      </div>
    </div>
  );
}

export default Login;
