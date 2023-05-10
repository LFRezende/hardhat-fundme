# Study Manual

## Initializing hardhat

`yarn init
yarn add --dev hardhat
yarn hardhat`

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

`- yarn add --dev dotenv`
Then, add the file .env to the project.
Remember to check if the .gitignore contains it.

## Contract with external imports

If you want to add a package like:
`yarn add --dev @chainlink/contracts`
