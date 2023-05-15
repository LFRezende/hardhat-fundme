# Study Manual

## Initializing hardhat

`yarn init`

`yarn add --dev hardhat`

`yarn hardhat`

- If you are not going to utilize the hardhat-deploy and wish to use a deploy.js script, remember to add to it the following line:

`const {ethers} = require("hardhat")`

- However, if you do want to use hardhat-deploy as a deployment manager, you need to add, as well, the following snippets:
  `yarn add --dev hardhat-deploy`

And then, in the hardhat-config.js, add:
`require("hardhat-deploy")`

Also add the following command to your terminal to overwrite, in your package json,the hardhat-ethers with the hardhat-deploy-ethers package.

`yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers`

Finally, add a "deploy" folder to your project, since this is where hardhat will look for when deploying a project.

Remember to number your projects as the following:
"X-deploy-nameofthecontract.js", where X is the order in which it should be compiled.

## Introducing the .env folder

`yarn add --dev dotenv`
Then, add the file .env to the project.
Remember to check if the .gitignore contains it.

After that, in your config file, add:

`require("dotenv)".config();`

To reference them in other files:

`const OBJ = process.env.OBJ;`

And remember to add OBJ to the .env file, like:
`OBJ = something`

## Contract with external imports

If you want to add a package like:
`yarn add --dev @chainlink/contracts`

# Deploying a contract

Code your main async function in your deploy script.
If must be one of these three:

- Easier way:
  `async function main(){
  hre.getNamedAccounts
  hre.deployments
  }
  module.exports.default = deployFunc

- Using anonymous functions and the whole hardhat run environment:
  `module.exports = async (hre) =>{
    const {getNamedAccounts, deployments} = hre;
} 
`

- Using the above with syntatic sugar:
  `module.exports = async({getNamedAccounts, deployments}) => {}`

`yarn hardhat deploy`

## Working with contracts on multiple versions

Go to your config file and set solidity in the module exports as:

`solidity: {
    compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
  },`

## Deploying your contract in hardhat chain (MockV3Aggregator)

Having imported previously the packages for your smart contract to work (as the following snippet):

`yarn add --dev @chainlink/contracts`

Now, create a folder "test" in the contracts folder. Then, add a file called "MockV3Aggregator.sol"

In it, add some code like this:

`//SPDX-License-Identifier: MIT`
`pragma solidity ^0.6.0`
`import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";`

To see if your mock needs constructor inputs, go to node-modules and find it in the test folder of the respective contract.

## Verifying your contract

One way of verifying your contract is by adding a folder to your project (utils) and add a verify.js.

Use the function as it is written in the script.

Remember to add the associated parameters in the .env
In your hardhat.config.js, remember to add the associated testnet (goerli) to your project, as well as the etherscan dict. (Cagarei pro gasReporter right now);

```
module.exports = {
  defaultNetwork: "hardhat",
  networks:{
    goerli:{
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6
    },
  }
  etherscan:{
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
}
```

In yout deploy script, remember to add:
`const {verify} = require("../utils/verify");`

Then, add the following:

```
 const args = [ethUsdPriceFeedAddress];
if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, args);
  }
```

At last, don't forget to add the the "waitConfirmations" in your fundme contract.

```
const fundMe = await deploy("FundMe", {
   from: deployer,
   args: args,
   log: true,
   waitConfirmations: network.config.blockConfirmations || 1,
 });
```

## --> CAUTIONS <--

1. Remember, always, to export the features you wish to import in other files via module.exports = {} in your root file;
2. Don't forget () in functions :3
