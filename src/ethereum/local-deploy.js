// this file only deploys CampaignDeployer Contract!!!
// assert {type: "json"}
import web3 from "./web3.js";
import compiled_CampaignDeployer from "./build/CampaignDeployer.json";

async function getAccounts() {
  const accounts = await web3.eth.getAccounts();
  return accounts;
}

const accounts = getAccounts();
console.log(accounts[0])

const campaignDeployer = new web3.eth.Contract(
  compiled_CampaignDeployer.abi
)
  .deploy({
    data: compiled_CampaignDeployer.evm.bytecode.object,
  })
  .send({
    from: accounts[0],
    gas: "1500000",
  });

export default campaignDeployer;
