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
    const [formData, setFormData] = useState({
      addressTo: '',
      amount: '',
      keyword: '',
      message: ''
    });

    const[isLoading,setisLoading] = useState('false');
    const[transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
  
    const handleChange = (e, name) => {
      setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
  
    const checkIfWalletIsConnected = async () => {
      try {
        if (!window.ethereum) {
          console.log('Metamask not installed');
          return;
        }
  
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  
        if (accounts.length) {
          setConnectedAccount(accounts[0]);
        } else {
          console.log('No account found');
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const connectWallet = async () => {
      try {
        if (!window.ethereum) {
          console.log('Metamask not installed');
          return;
        }
  
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        setConnectedAccount(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    };
  
    const sendTransaction = async () => {
      try {
        if (!window.ethereum) {
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
        await transactionHash.wait();
        setisLoading(false);
        console.log(`success:  ${transactionHash.hash}`);
    
        const transactionCount = await transactionContract.getTransactionCount();
    
        setTransactionCount(transactionCount.toNumber());
      } catch (error) {
        console.log(error);
      }
    };
    
  
    useEffect(() => {
      checkIfWalletIsConnected();
    }, []);
  
    return (
      <TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, setFormData, handleChange, sendTransaction }}>
        {children}
      </TransactionContext.Provider>
    );
  };
  