// this file only deploys CampaignDeployer Contract!!!
// assert {type: "json"}
import web3 from "./web3.js";
import compiled_CampaignDeployer from "./build/CampaignDeployer.json";

async function localDeploy() {
  const localAccounts = await web3.eth.getAccounts();

  const campaignDeployer = await new web3.eth.Contract(
    compiled_CampaignDeployer.abi
  )
    .deploy({
      data: compiled_CampaignDeployer.evm.bytecode.object,
    })
    .send({
      from: localAccounts[0],
      gas: "1500000",
    });

  return [campaignDeployer, localAccounts];
}


export default localDeploy;
