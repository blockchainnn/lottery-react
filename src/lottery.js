// Create a local contract instance

import web3 from './web3';

const address = '0x0BB4d5E8DF40559c44fAcd666cd93f0e9D2C1Fb3';

const abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "manager",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "pickWinner",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "getEntrants",
        "outputs": [{"name": "", "type": "address[]"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "", "type": "uint256"}],
        "name": "entrants",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "enter",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}

];

// exports a complete copy of the lottery contract
// that we can use on the front end
export default new web3.eth.Contract(abi, address);