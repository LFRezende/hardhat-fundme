const { network } = require("hardhat");
const {
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} = require("../helper-hardhat-config"); // U MUST EXPORT IT IN THE HELPER-CONFIG!!! And prefer passing as strings!

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  if (developmentChains.includes(network.name)) {
    log("Local Network Detected! Deploying MOcks...");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER],
    });
  }
  log("Mocks deployed!");
  log("----------------------------------------------------------------");
};

module.exports.tags = ["all", "mocks"];
