import Web3 from 'web3';


// console.log('old version:', window.web3.version)
// Use newer web3 provider (v1.0+) instead of default
// meta mask version of web3 (v0.2)
// const provider = window.web3.currentProvider.enable();
const web3 = new Web3(window.web3.currentProvider);

// console.log('new version:', window.web3.version.enable())


// console.log(web3.version)

export default web3;