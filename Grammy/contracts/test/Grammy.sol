// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Grammy, Voting} from "../src/Grammy.sol";

contract GrammyTest is Test {
    Grammy public grammy;

    function setUp() public {
        // Inicializa o contrato antes de cada teste
        grammy = new Grammy();
    }

    function test_AddVoting() public {
        // Adiciona uma votação
        grammy.addVoting("Option 1", "Option 2", "Option 3", 1 days);

        // Verifica se a votação foi criada corretamente
        Voting memory current = grammy.getCurrentVoting();
        assertEq(current.option1, "Option 1");
        assertEq(current.option2, "Option 2");
        assertEq(current.option3, "Option 3");
        assertTrue(current.maxDate > block.timestamp);
    }

    function test_AddVote() public {
        // Adiciona uma votação
        grammy.addVoting("Option 1", "Option 2", "Option 3", 1 days);

        // Registra um voto
        grammy.addVote(1);

        // Verifica se o voto foi registrado corretamente
        Voting memory current = grammy.getCurrentVoting();
        assertEq(current.votes1, 1);
        assertEq(current.votes2, 0);
        assertEq(current.votes3, 0);

        // Verifica o registro no mapeamento de votos
        (uint option, uint date) = grammy.votes(address(this), 0);
        assertEq(option, 1);
        assertTrue(date > 0);
    }

    function test_PreventDuplicateVote() public {
        // Adiciona uma votação
        grammy.addVoting("Option 1", "Option 2", "Option 3", 1 days);

        // Registra um voto
        grammy.addVote(1);

        // Tenta votar novamente
        vm.expectRevert("You already voted");
        grammy.addVote(2);
    }

    function test_InvalidOption() public {
        // Adiciona uma votação
        grammy.addVoting("Option 1", "Option 2", "Option 3", 1 days);

        // Tenta votar com uma opção inválida
        vm.expectRevert("Invalid option");
        grammy.addVote(4);
    }

    function test_VotingClosed() public {
        // Adiciona uma votação com tempo mínimo
        grammy.addVoting("Option 1", "Option 2", "Option 3", 1);

        // Avança o tempo para fechar a votação
        vm.warp(block.timestamp + 2);

        // Tenta votar após o encerramento
        vm.expectRevert("Voting is closed");
        grammy.addVote(1);
    }

    function test_MultipleVotings() public {
        // Adiciona duas votações
        grammy.addVoting("Option 1", "Option 2", "Option 3", 1 days);
        grammy.addVoting("Option A", "Option B", "Option C", 1 days);

        // Verifica a votação atual
        assertEq(grammy.currentVoting(), 1);

        // Vota na segunda votação
        grammy.addVote(2);

        // Verifica se o voto foi registrado corretamente na segunda votação
        Voting memory current = grammy.getCurrentVoting();
        assertEq(current.votes1, 0);
        assertEq(current.votes2, 1);
        assertEq(current.votes3, 0);
    }
}
