import React, { Component, Fragment } from "react";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import instance from "../ethereum/campaign-deployer";
import web3 from "../ethereum/web3";

class CreateNewCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minimumContribution: "",
    };
  }

  getVal = (e) => {
    this.setState({
      minimumContribution: e.target.value,
    });
  };

  createNewCampaign = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await instance.methods.deployCampaign(this.state.minimumContribution).send({
      from: accounts[0],
    });

  };

  render() {
    return (
      <Fragment>
        <h1>Create a new Campaign</h1>
        <Form onSubmit={this.createNewCampaign}>
          <Form.Field width={4}>
            <label>Minimum Contribution</label>
            <Input
              label={{ basic: true, content: "wei" }}
              labelPosition="right"
              placeholder="Number"
              onChange={this.getVal}
            />
            {/* <input onChange={this.getVal} placeholder="Number" /> */}
          </Form.Field>
          <Button primary animated="vertical" type="submit">
            <Button.Content hidden>Create</Button.Content>
            <Button.Content visible>
              <Icon name="ethereum" />
            </Button.Content>
          </Button>
        </Form>
      </Fragment>
    );
  }
}

export default CreateNewCampaign;
