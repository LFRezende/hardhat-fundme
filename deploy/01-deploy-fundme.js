const { network, ethers } = require("hardhat"); // BEWARE THE CURLY --> GRABS ONLY AN OBJECT FROM THE PACKAGE CALLED NETWORK.
const {
  networkConfig,
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} = require("../helper-hardhat-config"); // Pega apenas o networkConfig do helper-hardhat-config.js

const { getNamedAccounts } = require("hardhat");
/*function deployFunc() {
  console.log("Hi!!!!");
}

module.exports.default = deployFunc; */ // No parenthesis!

// Modelo da Função Anônima
// Enviar o hre como parâmetro é a mesma coisa que mandar
// todo o pacote/objeto do hardhat para a função
/*module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  // A mesmíssima coisa que fazeR:
  // hre.getNamedAccounts
  // hre.deployments
};*/

module.exports = async ({ getNamedAccounts, deployments }) => {
  // Getting the deployment data from deployments
  const { deploy, log } = deployments;
  // Getting accounts named to deployed
  const { deployer } = await getNamedAccounts();
  // Getting the chain id
  const chainId = network.config.chainId;
  console.log("HERE!");
  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }
  console.log("HERE!");
  // Deploying the contract without the address in mind (modularized)
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
  });
  console.log("HERE!");
};

// Versão mais compacta do modelo da Função Anônima^^

module.exports.tags = ["all", "fundMe"];
