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

module.exports = async ({ getNamedAccounts, deployments }) => {};

// Versão mais compacta do modelo da Função Anônima^^
