import Web3 from 'web3';
import ABI from './ABI.json';


const CONTRACT_ADDRESS = "0xc691daeb645fd29383e5c210ff082da772de311f";

export async function doLogin() {
  // Verifica se a MetaMask está instalada
  if (!window.ethereum) throw new Error('Please install MetaMask first.');

  try {
    const web3 = new Web3(window.ethereum); // Inicializa o Web3
    const accounts = await web3.eth.requestAccounts(); // Solicita as contas conectadas

    // Verifica se há contas conectadas
    if (!accounts || !accounts.length) throw new Error('No MetaMask account connected.');

    // Retorna a primeira conta conectada
    localStorage.setItem('wallet', accounts[0]); // (Opcional) Salva no localStorage
    return accounts[0];
  } catch (error) {
    throw new Error(error.message || 'Failed to connect to MetaMask.');
  }
}


export async function getCurrentVoting() {
  const wallet = localStorage.getItem('wallet');
  if (!wallet) throw new Error('No wallet connected.');

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: wallet });
  return contract.methods.getCurrentVoting().call();

}

export async function addVote(option) {
  if (!window.ethereum) throw new Error("MetaMask is not installed.");
  
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  const wallet = accounts[0];
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: wallet });

  try {
    const receipt = await contract.methods.addVote(option).send({
      from: wallet,
    });
    return receipt; // Retorna o recibo da transação
  } catch (error) {
    console.error("Error while voting:", error.message || error);
    throw new Error("Failed to vote.");
  }
}