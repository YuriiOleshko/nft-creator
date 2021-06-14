//overrides metamask v0.2 for our 1.0 version.
//1.0 lets us use async and await instead of promises
import Web3 from 'web3';

const web3 = new  Web3(Web3.givenProvider || "ws://localhost:8545");
console.log(web3.eth.providers,'givenProvider');
export default web3;
