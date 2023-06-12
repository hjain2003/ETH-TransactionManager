import React, { useEffect, useState } from 'react';
// import {ethers} from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';
const { ethers } = require('ethers');


export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });
}

export const TransactionProvider = ({ children }) => {

    const [connectedAccount, setConnectedAccount] = useState('');
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    });

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
    const checkIfWalletIsConnected = async () => {

        try {
            if (!ethereum) return alert('please install metamask');

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setConnectedAccount(accounts[0]);

                //getAllTransactions();
            }
            else {
                console.log("no account found");
            }

            console.log(accounts);
        } catch (error) {
            console.log(error);
            throw new Error("no ethereum object");
        }

    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('please install metamask');
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setConnectedAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("no ethereum object");
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert('please install metamask');

            //get data from form

        } catch (error) {
            console.log(error);
            throw new Error("no ethereum object");
        }
    }
    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAccount }}>
            {children}
        </TransactionContext.Provider>
    )
}