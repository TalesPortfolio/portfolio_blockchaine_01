// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

import {Test} from "forge-std/Test.sol";
import {Grammy, Voting} from "../src/Grammy.sol";

contract GrammyTest is Test {
    Grammy public grammy;

    function setUp() public {
        grammy = new Grammy();
    }

    function test_InitialVotingSetup() public {
        Voting memory initial = grammy.getCurrentVoting();
        assertEq(initial.option1, "Taylor Swift");
        assertEq(initial.option2, "Ed Sheeran");
        assertEq(initial.option3, "Benson Boone");
        assertEq(
            initial.maxDate,
            1767225599,
            "Incorrect maxDate for initial voting."
        );
    }

    function test_AddVoting() public {
        // Avança o tempo para encerrar a votação atual
        vm.warp(1767225600); // Avança o tempo para além de 31/12/2025 23:59:59 UTC

        // Adiciona uma nova votação
        grammy.addVoting("Option 1", "Option 2", "Option 3", 1 days);

        // Verifica se a nova votação foi criada corretamente
        Voting memory current = grammy.getCurrentVoting();
        assertEq(current.option1, "Option 1");
        assertEq(current.option2, "Option 2");
        assertEq(current.option3, "Option 3");
        assertTrue(current.maxDate > block.timestamp);
    }

    function test_AddVote() public {
        grammy.addVote(1);

        Voting memory current = grammy.getCurrentVoting();
        assertEq(current.votes1, 1);
        assertEq(current.votes2, 0);
        assertEq(current.votes3, 0);

        (uint option, uint date) = grammy.votes(address(this), 0);
        assertEq(option, 1);
        assertTrue(date > 0);
    }

    function test_PreventDuplicateVote() public {
        grammy.addVote(1);
        vm.expectRevert("You already voted");
        grammy.addVote(2);
    }

    function test_InvalidOption() public {
        vm.expectRevert("Invalid option");
        grammy.addVote(4);
    }

function test_VotingClosed() public {
    // Avança o tempo para encerrar a votação inicial
    vm.warp(1767225600); // Avança o tempo para além de 31/12/2025 23:59:59 UTC

    // Adiciona uma nova votação com tempo mínimo
    grammy.addVoting("Option 1", "Option 2", "Option 3", 1);

    // Avança o tempo para fechar a nova votação
    vm.warp(block.timestamp + 2);

    // Tenta votar após o encerramento
    vm.expectRevert("Voting is closed");
    grammy.addVote(1);
}


function test_MultipleVotings() public {
    // Avança o tempo para encerrar a votação inicial
    vm.warp(1767225600); // Avança o tempo para além de 31/12/2025 23:59:59 UTC

    // Adiciona a segunda votação
    grammy.addVoting("Option A", "Option B", "Option C", 1 days);

    // Verifica o índice da votação atual
    assertEq(grammy.currentVoting(), 1, "Current voting index is incorrect.");

    // Vota na segunda votação
    grammy.addVote(2);

    // Verifica se o voto foi registrado corretamente na segunda votação
    Voting memory current = grammy.getCurrentVoting();
    assertEq(current.votes1, 0, "Votes for option 1 should be 0.");
    assertEq(current.votes2, 1, "Votes for option 2 should be 1.");
    assertEq(current.votes3, 0, "Votes for option 3 should be 0.");
}


    function test_OnlyOwnerCanAddVoting() public {
        address nonOwner = address(0x123);
        vm.prank(nonOwner);
        vm.expectRevert("Only the owner can add a voting");
        grammy.addVoting("Option X", "Option Y", "Option Z", 1 days);
    }
}
