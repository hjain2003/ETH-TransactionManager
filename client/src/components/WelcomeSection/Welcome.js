import React, { useContext, useEffect, useState } from 'react';
import './Welcome.css';
import { TransactionContext } from '../../context/TransactionContext';
// import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
  />
);

const Welcome = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  const { connectWallet, connectedAccount, handleChange, sendTransaction, formData, TransactionState, TransactionHash, balance} = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();
    if (!addressTo || !amount || !keyword || !message) return;
    sendTransaction();
    console.log('done');
  };

  

  console.log(balance);

  const callAboutPage = async () => {
    try {
      const res = await fetch("http://localhost:5000/user", {
        method: "GET",
        headers: {
          Accept : "application/json",
          "Content-Type" : "application/json"
        },
        credentials : 'include'
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if(!res.status ===200){
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  }
  useEffect(() => {
    callAboutPage();
  },[]);


  return (
    <div className="wel_container">
      <nav className="navbar">
        <h1 align="center">ETH Transaction Manager</h1>
      </nav>
      <span className='user_name'>Hello {userData.name}</span>
      <div className="content">
        <div className="tagline_connect">
          <h1>Seamlessly Manage Your ETH Transactions</h1>
          <br />
          {!connectedAccount && <button className="connect" onClick={connectWallet}>Connect Your Wallet</button>}
          <br />
          <div className="card">
            <b>Your Wallet Address <br /> <span className="curr_acc">{connectedAccount} </span> </b>
            <br /><br />
            <b>Your current balance : <span className='curr_acc'>{balance} ETH</span></b>
          </div>
        </div>

        <div className="address_form">
          <div className="trans_details">
            <form action="">
              <Input type="text" placeholder="Address to" name="addressTo" handleChange={handleChange} /><br /><br />
              <Input type="number" placeholder="Amount (ETH)" name="amount" handleChange={handleChange} /><br /><br />
              <Input type="text" placeholder="Keyword" name="keyword" handleChange={handleChange} /><br /><br />
              <Input type="text" placeholder="Message..." name="message" handleChange={handleChange} /><br /><br />
              <button id="submit" onClick={handleSubmit}>Transact</button>
              <span className="transactionState">&nbsp;&nbsp; {TransactionState}</span>
              <br />
              {/* <span className='transactionState'>{TransactionHash}</span> */}
            </form>
          </div>
        </div>
      </div>
      {
        TransactionHash &&
      <div className="trans_hash"><b>TRANSACTION_HASH: </b>&nbsp;{TransactionHash}</div>
      }
    </div>
  );
};

export default Welcome;
