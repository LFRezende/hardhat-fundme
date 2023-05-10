require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  namedAccounts: {
    deployer: {
      default: {
        default: 0,
        5: 1,
      },
      user: {
        default: 2,
      },
    },
  },
};
