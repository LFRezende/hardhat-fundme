// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        //abi
        //Address : 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        // AggV3Interface is an interface which, when @address_contract, allows to
        // access certain functions of the contract of this address. These functions are defined
        //in the code of the interface
        (, int ethUsd, , , ) = priceFeed.latestRoundData();

        return uint256(ethUsd * 1e10); // To the 10th since decimals are 8 (10 + 8)
        // PS: These decimals are precision, not Wei
    }

    // Gets the number of decimals
    function getDecimals(
        AggregatorV3Interface priceFeed
    ) internal view returns (uint8) {
        return priceFeed.decimals();
    }

    function getConversionRate(
        uint256 ethAmountInWei,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountInUsd = (ethPrice * ethAmountInWei) / 1e18; // Since there is 1e18 in both param.
        // My interpretation: "Multiply" by (1/10**18)(eth/Wei), but 18 decimals remain for precision.
        return ethAmountInUsd; // 18 dec of precision
    }
}
