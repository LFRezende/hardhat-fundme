require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv");
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
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
