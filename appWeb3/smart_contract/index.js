const { Network, Alchemy } = require("alchemy-sdk");
require("dotenv").config();

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

async function getLatestBlock() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("Último bloco:", latestBlock);
}

getLatestBlock();
