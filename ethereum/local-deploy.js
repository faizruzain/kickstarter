const ganache = require("ganache");
const Web3 = require("web3");
const compiled_CampaignDeployer = require("./build/CampaignDeployer.json");
const compiled_Campaign = require("./build/Campaign.json");

const web3 = new Web3(ganache.provider());

async function localDeploy() {
  const accounts = await web3.eth.getAccounts();

  try {
    const campaignDeployer = await new web3.eth.Contract(
      compiled_CampaignDeployer.abi
    )
      .deploy({
        data: compiled_CampaignDeployer.evm.bytecode.object,
      })
      .send({
        from: accounts[0],
        gas: "1500000",
      });

    console.log(`\nCampaignDeployer address ${campaignDeployer.options.address}\n`);

    await campaignDeployer.methods.deployCampaign("100").send({
      from: accounts[0],
      gas: "1000000",
    });

    const [campaignAddress] = await campaignDeployer.methods
      .getDeployedCampaign()
      .call({
        from: accounts[0],
      });

    const campaign = await new web3.eth.Contract(
      compiled_Campaign.abi,
      campaignAddress
    );

    console.log(`\nCampaign address ${campaign.options.address}`);
  } catch (error) {
  console.log(`ini cok ${error}`);
  }
}

export default localDeploy;

//localDeploy();
