import Web3 from "web3";

//const API = "https://goerli.infura.io/v3/f22729a20ad0427ab1790343739a33f0";
let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3("http://127.0.0.1:7545"); //new Web3.providers.HttpProvider(API);
  web3 = new Web3(provider);
}

export default web3;
