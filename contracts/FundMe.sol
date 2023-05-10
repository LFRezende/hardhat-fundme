// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;
    address[] public funders;
    mapping(address=> uint256) public funderToAmount;
    address public owner;
    constructor(){
        owner = msg.sender;
    }
   
    
    uint256 minimumUsd = 50*10**18; // The decimals must match to ethAmountInUSD, which has 18 decimals places.
    function fund() public payable{
        // Minimum in USD
        // 1. Eth to contract 
        require(msg.value.getConversionRate() >=1e18, "Send more"); // Math done in WEI. 1ETH=1e18;
        // revert: desfaz tudo de antes e devolve todo o gás que vem depois do require
        funders.push(msg.sender);
        funderToAmount[msg.sender] += msg.value;
    }

    function withdraw() public isOwner{
         (bool callSuccess,)  = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call Failed!");
        for (uint256 index = 0; index < funders.length; index ++){
            funderToAmount[funders[index]] = 0;
        }
        funders = new address[](0); // Instead of loop and cost gas, we refresh the whole list.
        // We create a fresh new (NEW) list of addresses (ADDRESSES[]) with Zero elements (0).
   

    }
    modifier isOwner{
        require(msg.sender == owner, "U no ADM, B Gone!");
        _;
    }
}