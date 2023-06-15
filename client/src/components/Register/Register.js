import React, { useState } from 'react'
import './Register.css';
// import Navbar from '../Navbar/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const navigate = useNavigate();

  const [user, setuser] = useState({
    name: "",
    email: "",
    password: ""
  });


  let name, value;
  const handleChange = (e) => {
    // console.log(e);
    name = e.target.name; //input field name
    value = e.target.value;

    setuser({ ...user, [name]: value });
  }



  const PostData = async (e) => {
    e.preventDefault();
    const { name, email,password} = user;

    const res = await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
      })
    });

    const data = await res.json();

    if (res.status === 422) {
      window.alert("Registration failed");
      console.log("Registration failed")
      console.log(res.status);
    }
    else if (res.status !== 422) {
      window.alert("Registration successfull");
      console.log("Registration successfull");
      console.log(res.status);
      console.log(data);
      navigate('/login');
    }
  };

    return (
      <>
        <div className="register_box">
          <form>
            <h1 align="center">Register</h1>
            <br /><br />
            <span>Name: <input type="name" name="name" placeholder='Enter Name' onChange={handleChange} /></span>
            <br /><br />
            <span>Email: <input type="email" name="email" placeholder='Enter Email' onChange={handleChange} /></span>
            <br /><br />
            <span>Password: <input type="password" name="password" placeholder='Enter password' onChange={handleChange} /></span>
            <br /><br />
            <input type="submit" name="submit" id="submit" onClick={PostData} />
          </form>
          <br /><br />
          {/* Already have an account ? <NavLink to='/login'>Login</NavLink> */}
        </div>
      </>
    )
  }

  export default Register