// happy coding 👻
import { BigNumber } from "bignumber.js";
import * as TruffleContracts from ".";
const Web3 = require('web3');

let web3: typeof Web3
let web3Provider;
//web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545')); // was 9545 before


function main() {   
  //function definition 
  console.log("Hello World!"); 
	if (typeof web3 !== 'undefined') {
		web3Provider = web3.currentProvider;
		web3 = new Web3(web3.currentProvider);
	} else {
		// set the provider you want from Web3.providers
		web3Provider = new Web3.providers.HttpProvider('https://services.jade.builders/multi-geth/kotti/1.9.9');
		web3 = new Web3(web3Provider);
	}
	//console.log(web3.currentProvider);
	console.log(TruffleContracts);
}

main();//function invocation
