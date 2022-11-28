import { Component } from "react";
import compiled_CampaignDeployer from "../ethereum/build/CampaignDeployer.json";
import web3 from "../ethereum/web3";

class CampaignList extends Component {
  constructor() {
    super();
    this.state = {
      deployedCampaignList: [],
    };
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();

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

    await campaignDeployer.methods.deployCampaign("100").send({
      from: accounts[0],
      gas: "1000000",
    });

    const addresses = await campaignDeployer.methods
      .getDeployedCampaign()
      .call({
        from: accounts[0]
      });

    this.setState({
      deployedCampaignList: addresses,
    });
  }

  render() {
    const addresses = this.state.deployedCampaignList;
    return (
      <div>
        <h1>This is the list of Campaigns</h1>
        {addresses.map((address, index) => {
          return <h3 key={index}>{address}</h3>;
        })}
      </div>
    );
  }
}

export default CampaignList;
