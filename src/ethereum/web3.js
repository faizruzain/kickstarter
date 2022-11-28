import ganache from "ganache";
import Web3 from "web3";

const web3 = new Web3(ganache.provider());

export default web3;
