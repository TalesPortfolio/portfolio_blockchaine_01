// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

struct Voting {
    string option1;
    uint votes1;
    string option2;
    uint votes2;
    string option3;
    uint votes3;
    uint maxDate;
}

struct Vote {
    uint option;
    uint date;
}

contract Grammy {
    address owner;
    uint public currentVoting = 0;
    Voting[] public votings;
    mapping(address => mapping(uint => Vote)) public votes; // Corrigido o mapeamento

    constructor() {
        owner = msg.sender;
    }

    // Obter a votação atual
    function getCurrentVoting() public view returns (Voting memory) {
        return votings[currentVoting];
    }

    // Criar uma votação com 3 opções e um tempo para votação
    function addVoting(
        string memory option1,
        string memory option2,
        string memory option3,
        uint timeToVote
    ) public {
        require(msg.sender == owner, "Only the owner can add a voting");
        if (votings.length != 0) currentVoting++;

        Voting memory newVoting;
        newVoting.option1 = option1;
        newVoting.option2 = option2;
        newVoting.option3 = option3;
        newVoting.maxDate = block.timestamp + timeToVote;
        votings.push(newVoting);
    }

    // Votar em uma opção
    function addVote(uint option) public {
        require(option >= 1 && option <= 3, "Invalid option");
        require(
            block.timestamp < votings[currentVoting].maxDate,
            "Voting is closed"
        );
        require(
            votes[msg.sender][currentVoting].date == 0,
            "You already voted"
        );

        votes[msg.sender][currentVoting] = Vote(option, block.timestamp);

        if (option == 1) votings[currentVoting].votes1++;
        if (option == 2) votings[currentVoting].votes2++;
        if (option == 3) votings[currentVoting].votes3++;
    }
}
