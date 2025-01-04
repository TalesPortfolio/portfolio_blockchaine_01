// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Grammy.sol";

contract DeployGrammy is Script {
    function run() external {
        // Carregar chave privada do arquivo .env
        string memory privateKey = vm.envString("PRIVATE_KEY");

        // Iniciar a transmissão da transação
        vm.startBroadcast(vm.envUint(privateKey));

        // Fazer o deploy do contrato
        Grammy grammy = new Grammy();

        // Exibir o endereço do contrato implantado
        console.log("Grammy contract deployed at:", address(grammy));

        // Finalizar a transmissão
        vm.stopBroadcast();
    }
}

