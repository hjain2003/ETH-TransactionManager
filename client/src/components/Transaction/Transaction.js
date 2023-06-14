import { React, useContext } from 'react'
import { TransactionContext } from '../../context/TransactionContext';
import dummyData from '../../utils/dummyData';
import './Transaction.css';


const TransactionCard = ({ addressTo, addressFrom, timestamp, amount, message, keyword, url }) => {
  return (
    <div className='transaction_card'>
      <b>From</b>: &nbsp;&nbsp;
      <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target='_blank'>
        {`${addressFrom.slice(0, 3)}..${addressFrom.slice(-4)}`}
      </a>
      <hr />
      <b>To</b>: &nbsp;&nbsp;
      <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target='_blank'>
        {`${addressTo.slice(0, 3)}..${addressTo.slice(-4)}`}
      </a>
      <hr />
      <b>Amount</b>: &nbsp;&nbsp;{amount} ETH
      <hr />
      {message && (<span><b>Message</b>:&nbsp;&nbsp;{message}</span>)}hello
      <hr />
      <b>Time</b>: &nbsp;&nbsp; {timestamp}
      <hr />
      <b>Keyword</b>: &nbsp;&nbsp; {keyword}
    </div>

  );
}

const Transaction = () => {

  const { connectWallet, connectedAccount, handleChange, sendTransaction, formData, TransactionState, TransactionHash, balance } = useContext(TransactionContext);

  return (
    <>
      <div className='TransContainer'>
        {connectedAccount ? (<h1>TRANSACTION HISTORY</h1>) : (<h1>Connect ur account to see latest changes...</h1>)}
        <br />
        <div className="transactions">
          {
            dummyData.reverse().map((transaction, index) => (
              <TransactionCard key={index}{...transaction} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Transaction
