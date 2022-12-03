import * as dotenv from "dotenv";
// deploy code will go here
import Web3 from "web3";
import campaignDeployer from "../ethereum/build/CampaignDeployer.json" assert { type: "json" }; // assert { type: "json" }
import HDWalletProvider from "@truffle/hdwallet-provider";
// console.log(campaignDeployer.abi);
// console.log("\n");
// console.log(campaignDeployer.evm.bytecode.object);

dotenv.config();

// const API = process.env.API;
// const mnemonicPhrase = process.env.MNEMONIC_PHRASE; // should save this in .env variable
// let provider = new HDWalletProvider({
//   mnemonic: {
//     phrase: mnemonicPhrase,
//   },
//   providerOrUrl: API,
// });

//let provider = new HDWalletProvider(mnemonicPhrase, API)

const web3 = new Web3("http://127.0.0.1:7545");

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(` Attempting to deploy from account ${accounts[0]}`);

  const result = await new web3.eth.Contract(campaignDeployer.abi)
    .deploy({ data: campaignDeployer.evm.bytecode.object })
    .send({ from: accounts[0], gas: "2000000" });

  console.log(`Contract deployed at address: ${result.options.address}`);

  // At termination, `provider.engine.stop()' should be called to finish the process elegantly.
  // provider.engine.stop();
};

deploy();
