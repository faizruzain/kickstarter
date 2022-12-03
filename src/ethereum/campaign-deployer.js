import web3 from "./web3.js";
import CampaignDeployer from "../ethereum/build/CampaignDeployer.json";

const instance = new web3.eth.Contract(
  CampaignDeployer.abi,
  "0xA14b337dFaf5229f65972b76aD9dBbfb332182f8"
);

export default instance;
