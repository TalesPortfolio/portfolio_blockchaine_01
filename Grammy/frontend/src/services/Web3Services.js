import Web3 from 'web3';
import ABI from './ABI.json';


//const CONTRACT_ADDRESS = "0xc691daeb645fd29383e5c210ff082da772de311f";

const CONTRACT_ADDRESS = "0x808B5e9A89Aa0431aB90ab785071E61FC7516Dfc"

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
    //console.error("Error while voting:", error.message || error);
    throw new Error(error.message || "Failed to vote.");
  }
}

export async function getVotingResults() {
  try {
    const currentVoting = await contract.methods.getCurrentVoting().call();
    const results = [
      { option: currentVoting.option1, votes: currentVoting.votes1 },
      { option: currentVoting.option2, votes: currentVoting.votes2 },
      { option: currentVoting.option3, votes: currentVoting.votes3 },
    ];
    return results.sort((a, b) => b.votes - a.votes); // Ordena por votos decrescentes
  } catch (error) {
    console.error("Error fetching voting results:", error.message || error);
    throw new Error("Failed to fetch voting results.");
  }
}

export async function checkIfAlreadyVoted(walletAddress) {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

  try {
    const vote = await contract.methods.votes(walletAddress, currentVoting).call();
    return vote.date !== "0"; // Retorna true se já votou
  } catch (error) {
    console.error("Error checking vote status:", error);
    return false;
  }
}