//https://eth-sepolia.g.alchemy.com/v2/NrBqHIPG1MMcM9JiMzMwIbaQoWcqccQ-


require('@nomiclabs/hardhat-waffle');
// require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/NrBqHIPG1MMcM9JiMzMwIbaQoWcqccQ-',
      accounts: ['e7f5ff9ffcb41aeb813ec9b9e7bdde30cec2c26c94ecd57af9f3e98876afbf40']
    }
  }
}

