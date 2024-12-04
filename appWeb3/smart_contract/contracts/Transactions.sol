// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Transactions {

    uint256 transactionsCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] public transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public payable {
        transactionsCount++;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
        require(msg.value == amount, "Amount is not equal to value");
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;    
    }

    function getAllTransactionsCount() public view returns (uint256) {
        return transactionsCount;
    }

}