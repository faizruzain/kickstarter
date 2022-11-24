const assert = require("assert");
const ganache = require("ganache");
const { beforeEach } = require("mocha");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiled_Campaign = require("../ethereum/build/Campaign.json");

const compiled_CampaignDeployer = require("../ethereum/build/CampaignDeployer.json");

console.log(typeof compiled_CampaignDeployer);

let accounts;
let campaignDeployer;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  campaignDeployer = await new web3.eth.Contract(compiled_CampaignDeployer.abi)
    .deploy({
      data: compiled_CampaignDeployer.evm.bytecode.object,
    })
    .send({
      from: accounts[0], //manager
      gas: "1500000",
    });

  await campaignDeployer.methods.deployCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  const [campaignAddress] = await campaignDeployer.methods
    .getDeployedCampaign()
    .call({
      from: accounts[0],
    });

  campaign = await new web3.eth.Contract(
    compiled_Campaign.abi,
    campaignAddress
  );
});

describe("Campaigns", () => {
  it("Deploys a campaignDeployer and a campaign", () => {
    assert.ok(campaignDeployer.options.address);
    assert.ok(campaign.options.address);
    // console.log(
    //   `CampaignDeployer contract deployed at address ${campaignDeployer.options.address}\nCampaign contract deployed at address ${campaign.options.address}`
    // );
  });

  it("marks caller as the manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
    //console.log(accounts[0], manager);
  });
});
