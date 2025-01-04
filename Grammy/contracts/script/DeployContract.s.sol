// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Grammy.sol"; // Substitua pelo nome do seu contrato

contract DeployContract is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy do contrato
        Grammy grammy = new Grammy();

        console.log("Contract deployed at:", address(grammy));

        vm.stopBroadcast();
    }
}
