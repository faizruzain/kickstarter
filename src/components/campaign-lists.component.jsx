import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import instance from "../ethereum/campaign-deployer";
import MyButton from "./button.component";

class CampaignLists extends Component {
  constructor() {
    super();
    this.state = {
      deployedCampaignList: [],
    };
  }

  async componentDidMount() {
    const addresses = await instance.methods.getDeployedCampaign().call();

    this.setState({
      deployedCampaignList: addresses,
    });
  }

  render() {
    const items = this.state.deployedCampaignList.map((campaignAddress) => {
      return {
        header: campaignAddress,
        description: (
          <Link to={`/campaigns/${campaignAddress}`}>View Campaign</Link>
        ),
        fluid: true,
      };
    });
    return (
      <div>
        <h1>Open Campaigns</h1>
        {/* <div> */}
        <Link to={"/campaigns/new"}>
          <MyButton />
        </Link>
        <Card.Group items={items} />
        {/* </div> */}
      </div>
    );
  }
}

export default CampaignLists;
