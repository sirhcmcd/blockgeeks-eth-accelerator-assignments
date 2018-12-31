var Election = artifacts.require('Election');

contract('Election contract Tests', async (accounts) => {
    let owner = accounts[0];
    let voter1 = accounts[1];
    let voter2 = accounts[2];
    let contract;

    let getCandidate = async (id) => {
        let candidate = await contract.candidates.call(id);
        let name = candidate[0];
        let votes = parseInt(candidate[1]); // convert from BN to int
        return {name: name, votes: votes};
    }

    beforeEach(async () => {
        contract = await Election.deployed();
    })
    
  })

