import React, { useEffect, useState } from 'react';
import { contractABI, contractAddress } from '../utils/constants';
import Web3 from 'web3';
import {ethers} from 'ethers'



export const TransactionContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
    if (!ethereum || !ethereum.isMetaMask) {
        console.log('Metamask not installed');
        return;
      }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('');
    const [TransactionState, setTransactionState] = useState('');
    const [TransactionHash, setTransactionHash] = useState('');
    const[transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [balance, setBalance] = useState('');
    const [formData, setFormData] = useState({
      addressTo: '',
      amount: '',
      keyword: '',
      message: ''
    });

    const[isLoading,setisLoading] = useState('false');
  
    const handleChange = (e, name) => {
      setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllTransactions = async()=>{
      try {
        if(!ethereum) return alert('plz install metamask');
        const transactionContract = getEthereumContract();
        const availableTransactions = await transactionContract.getAllTransactions();

        console.log(availableTransactions);
      } catch (error) {
        console.log(error);
      }
    }
  
    const checkIfWalletIsConnected = async () => {
      try {
        if (!ethereum) {
          console.log('Metamask not installed');
          return;
        }
  
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        
        if (accounts.length) {
          setConnectedAccount(accounts[0]);
          getAllTransactions();
          const provider = new ethers.providers.Web3Provider(ethereum);
          const balance = await provider.getBalance(accounts[0]);
          const formattedBalance = ethers.utils.formatEther(balance);
          const roundedBalance = parseFloat(formattedBalance).toFixed(5);
          setBalance(roundedBalance);
        } else {
          console.log('No account found');
        }
      } catch (error) {
        console.log(error);
      }
    };

    const checkIfTransactionsExist = async () => {
      try {
        const transactionContract = getEthereumContract();
        const transactionCount = await transactionContract.transactionCount();
    
        window.localStorage.setItem("transactionCount", transactionCount.toString());
      } catch (error) {
        console.log(error);
      }
    };
    
  
    const connectWallet = async () => {
      try {
        if (!ethereum) {
          console.log('Metamask not installed');
          return;
        }
  
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  
        setConnectedAccount(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    };
  
    const sendTransaction = async () => {
      try {
        if (!ethereum) {
          console.log('Metamask not installed');
          return;
        }
    
        const { addressTo, amount, keyword, message } = formData;
        const transactionContract = getEthereumContract();
        const parsedAmount = ethers.utils.parseUnits(amount, 'ether'); // Convert amount to wei
    
        await ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: connectedAccount,
            to: addressTo,
            gas: '0x5208',
            value: ethers.utils.hexlify(parsedAmount) // Provide the value in wei
          }]
        });
    
        const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, keyword, message);
        setisLoading(true);
        console.log(`loading:  ${transactionHash.hash}`);
        setTransactionState('SENDING ...');
        await transactionHash.wait();
        setisLoading(false);
        console.log(`success:  ${transactionHash.hash}`);
        setTransactionState('ETH TRANSFERRED SUCCESSFULLY!');
        setTransactionHash(transactionHash)
    
        const transactionCount = await transactionContract.getTransactionCount();
    
        setTransactionCount(transactionCount.toNumber());
      } catch (error) {
        console.log(error);
      }
    };
    
  
    useEffect(() => {
      checkIfWalletIsConnected();
      checkIfTransactionsExist();
    }, []);
  
    return (
      <TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, setFormData, handleChange, sendTransaction, TransactionState, TransactionHash : TransactionHash.hash, balance }}>
        {children}
      </TransactionContext.Provider>
    );
  };
  