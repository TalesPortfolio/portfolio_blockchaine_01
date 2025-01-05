// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.18;

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
    uint public currentVoting = 0; // Mantém o índice da votação atual
    Voting[] public votings;
    mapping(address => mapping(uint => Vote)) public votes;

    // Declaração única dos eventos
    event VoteCasted(address indexed voter, uint option, uint timestamp);
    event VotingAdded(string option1, string option2, string option3, uint maxDate);
    event ErrorOccurred(string message);

    constructor() {
        owner = msg.sender;

        // Criação da votação inicial no momento do deploy
        Voting memory initialVoting;
        initialVoting.option1 = "Taylor Swift";
        initialVoting.option2 = "Ed Sheeran";
        initialVoting.option3 = "Benson Boone";
        initialVoting.maxDate = 1767225599; // Timestamp para 31/12/2025 23:59:59 UTC
        votings.push(initialVoting);
    }

    // Obter a votação atual
    function getCurrentVoting() public view returns (Voting memory) {
        return votings[currentVoting];
    }

    // Criar uma nova votação
    function addVoting(
        string memory option1,
        string memory option2,
        string memory option3,
        uint timeToVote
    ) public {
        require(msg.sender == owner, "Only the owner can add a voting");
        require(
            block.timestamp > votings[currentVoting].maxDate,
            "Current voting is still active"
        );

        currentVoting++; // Incrementa o índice apenas quando uma votação termina

        Voting memory newVoting;
        newVoting.option1 = option1;
        newVoting.option2 = option2;
        newVoting.option3 = option3;
        newVoting.maxDate = block.timestamp + timeToVote;
        votings.push(newVoting);

        emit VotingAdded(option1, option2, option3, newVoting.maxDate);
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

        emit VoteCasted(msg.sender, option, block.timestamp);
    }
}
