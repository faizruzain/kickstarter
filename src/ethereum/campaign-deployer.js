import web3 from "./web3.js";
import CampaignDeployer from "../ethereum/build/CampaignDeployer.json";

const instance = new web3.eth.Contract(
  CampaignDeployer.abi,
  "0x6BF4BEf0e86e48C99cAe2Ae1ad15Ce0cf5da31FD"
);

export default instance;
