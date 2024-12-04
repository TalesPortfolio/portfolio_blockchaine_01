async function main() {
    console.log("Getting contract factory...");
    const TransactionFactory = await ethers.getContractFactory("Transactions");
  
    console.log("Deploying contract...");
    const transactionContract = await TransactionFactory.deploy();
  
    console.log("Waiting for deployment...");
    await transactionContract.deployed();
  
    console.log("Transactions deployed to:", transactionContract.address);
  }
  
  main().catch((error) => {
    console.error("Deployment failed", error);
    process.exitCode = 1;
  });
  