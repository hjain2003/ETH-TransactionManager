import React, { useState } from 'react'
import './Login.css';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);

    try {
      const response = await axios.post('http://localhost:5000/user/login', user);
      console.log(response.data); // Assuming the server returns the registered user data
      // Perform any additional actions after successful registration
      window.alert("Login successfull");
      navigate('/');
    } catch (error) {
      console.log(error.response.data); // Log any error response from the server
    }

  }
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

  return (
    <>
    <div className="register_box">
        <form action="">
            <h1 align="center">Login</h1>
            <br /><br />
            <span>Email: <input type="email" name="email" placeholder='Enter Email' onChange={handleChange}/></span>
            <br /><br />
            <span>Password: <input type="password" name="password" placeholder='Enter password' onChange={handleChange}/></span>
            <br /><br />
            <input type="submit" name="submit" id="submit" onClick={handleSubmit} />
        </form>
        <br /><br />
        Don't have an account ? <NavLink to='/register'>Register</NavLink>
    </div>
    </>    
  )
}

export default Login