//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transactions{
    uint transactionCounter;

    event Transfer(address from, address receiver, uint amount, string message, uint timestamp, string keyword);

    struct Transfer_details{
        address sender;
        address receiver;
        uint amount;
        uint timestamp;
        string keyword;
        string message;
    }

    Transfer_details[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory keyword, string memory message) public {
        transactionCounter+=1;
        transactions.push(Transfer_details(msg.sender,receiver,amount,block.timestamp,keyword,message));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns(Transfer_details[] memory){
        return transactions;
    }

    function getTransactionCount() public view returns(uint){
        return transactionCounter;
    }


}


