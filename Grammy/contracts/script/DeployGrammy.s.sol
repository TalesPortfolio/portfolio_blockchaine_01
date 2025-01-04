// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Grammy.sol";

contract DeployGrammy is Script {
    function run() external {
        // Carregar as variáveis do .env
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        string memory rpcUrl = vm.envString("RPC_URL");


        // Iniciar transmissão
        vm.startBroadcast(privateKey);

        // Fazer o deploy do contrato
        Grammy grammy = new Grammy();

        // Exibir o endereço do contrato
        console.log("Grammy contract deployed at:", address(grammy));

        vm.stopBroadcast();
    }
}
