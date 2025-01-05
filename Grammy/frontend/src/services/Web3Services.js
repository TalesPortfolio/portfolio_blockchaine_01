import Web3 from "web3";
import ABI from "./ABI.json";

// Endereço do contrato implantado
const CONTRACT_ADDRESS = "0x55452e5779A5C903D8e54ACe2b4631E650BC6BF4";

// Função para conectar a carteira do usuário usando MetaMask
export async function doLogin() {
  if (!window.ethereum) throw new Error("Please install MetaMask first.");

  try {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();

    if (!accounts || !accounts.length) throw new Error("No MetaMask account connected.");

    localStorage.setItem("wallet", accounts[0]); // Armazena a conta conectada
    return accounts[0];
  } catch (error) {
    throw new Error(error.message || "Failed to connect to MetaMask.");
  }
}

// Função para obter os dados da votação atual
export async function getCurrentVoting() {
  const wallet = localStorage.getItem("wallet");
  if (!wallet) throw new Error("No wallet connected.");

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: wallet });

  const voting = await contract.methods.getCurrentVoting().call();

  return {
    option1: voting.option1,
    votes1: Number(voting.votes1), // Converte para número
    option2: voting.option2,
    votes2: Number(voting.votes2),
    option3: voting.option3,
    votes3: Number(voting.votes3),
    maxDate: Number(voting.maxDate),
  };
}

// Função para registrar um voto na votação atual
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
    throw new Error(error.message || "Failed to vote.");
  }
}

// Função para obter os resultados da votação
export async function getVotingResults() {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

  try {
    const currentVoting = await contract.methods.getCurrentVoting().call();

    const results = [
      { option: currentVoting.option1, votes: Number(currentVoting.votes1) }, // Converte para número
      { option: currentVoting.option2, votes: Number(currentVoting.votes2) },
      { option: currentVoting.option3, votes: Number(currentVoting.votes3) },
    ];

    return results.sort((a, b) => b.votes - a.votes); // Ordena por número de votos decrescente
  } catch (error) {
    throw new Error(error.message || "Failed to fetch voting results.");
  }
}

// Função para verificar se um usuário já votou
export async function checkIfAlreadyVoted(walletAddress) {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

  try {
    const currentVoting = await contract.methods.currentVoting().call();
    const vote = await contract.methods.votes(walletAddress, currentVoting).call();
    return vote.date !== "0"; // Retorna `true` se já votou
  } catch (error) {
    console.error("Error checking vote status:", error);
    return false; // Retorna `false` em caso de erro
  }
}
