import { Client, Wallet } from 'xrpl';

const DEV_URL = 'wss://s.devnet.rippletest.net:51233'; // Public test net provided by Ripple

// Function to create and connect a client
async function createClient() {
  const client = new Client(DEV_URL);
  await client.connect();
  return client;
}

// Function to disconnect a client
async function disconnectClient(client) {
  await client.disconnect();
}

// Function to generate and fund a wallet
async function generateAndFundWallet(client) {
  // Generate a wallet
  const wallet = Wallet.generate();

  // Fund the wallet using the Testnet faucet
  await client.fundWallet(wallet);

  // Return the wallet
  return wallet;
}

export { createClient, disconnectClient, generateAndFundWallet };
