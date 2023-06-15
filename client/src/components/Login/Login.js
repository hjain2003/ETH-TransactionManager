import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [user, setuser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = user;

    const res = await fetch('http://localhost:5000/user/login', {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if (res.status === 400) {
      window.alert("Login failed");
      console.log("Login failed");
      console.log(res.status);
      console.log(data);
    } else if (res.status !== 400) {
      window.alert("Login successful");
      console.log("Login successful");
      navigate('/');
      console.log(res.status);
      console.log(data);
    }
  }

  return (
    <>
      <div className="register_box">
        <form action="">
          <h1 align="center">Login</h1>
          <br /><br />
          <span>Email: <input type="email" name="email" placeholder='Enter Email' onChange={handleChange} /></span>
          <br /><br />
          <span>Password: <input type="password" name="password" placeholder='Enter password' onChange={handleChange} /></span>
          <br /><br />
          <input type="submit" name="submit" id="submit" onClick={loginUser} />
        </form>
        <br /><br />
        Don't have an account ? <NavLink to='/register'>Register</NavLink>
      </div>
    </>
  )
}

export default Login;
