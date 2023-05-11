const { network } = require("hardhat"); // BEWARE THE CURLY --> GRABS ONLY AN OBJECT FROM THE PACKAGE CALLED NETWORK.
const { networkConfig } = require("../helper-hardhat-config");

function deployFunc() {
  console.log("Hi!!!!");
}

module.exports.default = deployFunc; // No parenthesis!

// Modelo da Função Anônima
// Enviar o hre como parâmetro é a mesma coisa que mandar
// todo o pacote/objeto do hardhat para a função
module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  // A mesmíssima coisa que fazeR:
  // hre.getNamedAccounts
  // hre.deployments
};

module.exports = async ({ getNamedAccounts, deployments }) => {
  // Getting the deployment data from deployments
  const { deploy, log } = deployments;
  // Getting accounts named to deployed
  const { deployer } = await getNamedAccounts;
  // Getting the chain id
  const chainId = network.config.chainId;

  const address = networkConfig[chainId]["ethUsdPriceFeed"];

  // Deploying the contract without the address in mind (modularized)
  const fundMe = deploy("FundMe", {
    from: deployer,
    args: [address],
    log: true,
  });
};

// Versão mais compacta do modelo da Função Anônima^^
