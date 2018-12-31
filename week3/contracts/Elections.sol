pragma solidity ^0.4.24;

contract Election {
    address public owner;
    string public name;
    event Vote(string candidateName, uint voteCount);

    struct Candidate {
        string name;
        uint voteCount;
    }

    struct Voter {
        bool authorized;
        bool voted;
        uint vote;
    }

    uint public totalVotes;
    Candidate[] public candidates;
    mapping(address => Voter) public voters;

    modifier ownerOnly() {
        require(msg.sender == owner, "Only owner is allowed");
        _;
    }

    constructor(string _name) public {
        owner = msg.sender;
        name = _name;
    }

    function getNumCandidate() public view returns (uint) {
        return candidates.length;
    }

    function addCandidate(string _name) ownerOnly public {
        candidates.push(Candidate(_name, 0));
    }

    function authorize(address _voter) ownerOnly public {
        require(!voters[_voter].voted, "Voter already voted");
        voters[_voter].authorized = true;
    }

    function vote(uint _candidate) public {
        require(voters[msg.sender].authorized, "Not authorized to vote");
        require(!voters[msg.sender].voted, "Voter already voted");
        require(_candidate < candidates.length, "Not a valid candidate");

        voters[msg.sender].vote = _candidate;
        voters[msg.sender].voted = true;

        candidates[_candidate].voteCount += 1;
        totalVotes += 1;
        emit Vote(candidates[_candidate].name, candidates[_candidate].voteCount);
    }

} 