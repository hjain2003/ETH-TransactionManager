import React, { useState, useContext } from 'react'
import './Welcome.css';
import { TransactionContext } from '../../context/TransactionContext';

const Welcome = () => {
  const {connectWallet,connectedAccount} = useContext(TransactionContext);

  // console.log(values);

  const [trans_details, settrans_details] = useState({
    address_to : "",
    amount : "",
    keyword : "",
    message : ""
  });

  let name,value;
  const handleChange = (e)=>{
    name = e.target.value;
    value = e.target.value;

    settrans_details({...trans_details,[name] : value});
  }



  return (
    <div className='wel_container'>
      <nav className='navbar'>
        <h1 align="center">ETH Transaction Manager</h1>
      </nav>

      <div className="content">
        <div className="tagline_connect">
          <h1>Seamlessly Manage Your ETH Transactions</h1>
          <br />
          {
            !connectedAccount &&
          <button className="connect" onClick={connectWallet}>Connect Your Wallet</button>
          }
          <br />
          <div className="card">
            <b>Your Wallet Address </b>
          </div>
        </div>

        <div className="address_form">
          <div className="trans_details">
            <form action="">
              <input type="text" placeholder='Address to' name="address_to"  onChange={handleChange}/><br /><br />
              <input type="number" placeholder='Amount (ETH)' name="amount"  onChange={handleChange}/><br /><br />
              <input type="text" placeholder='Keyword' name="keyword" onChange={handleChange} /><br /><br />
              <input type="text" placeholder='message...' name="message"  onChange={handleChange}/><br /><br />

              <input type="submit" name="submit" value="Transact" id="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
