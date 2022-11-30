import React, { Component, Fragment } from "react";
import {
  Button,
  Form,
  Icon,
  Input,
  Message,
  Transition,
  Container,
} from "semantic-ui-react";
import instance from "../ethereum/campaign-deployer";
import web3 from "../ethereum/web3";
import { Link } from "react-router-dom";

class CreateNewCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minimumContribution: "",
      errorMessage: "",
      successMessage: "A Campaign was Successfully Created!",
      errorCode: 0,
      animation: "swing up",
      duration: 300,
      loading: false,
      transactionHash:
        "0x85c3ef500a63247feffa39cb4df5bebb2902d25d2933730dd7dbaa808adf3ff0",
      success: false,
      negative: false,
    };
  }

  getVal = (e) => {
    this.setState({
      minimumContribution: e.target.value,
    });
  };

  createNewCampaign = async (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    try {
      const accounts = await web3.eth.getAccounts();
      await instance.methods
        .deployCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        })
        .on("transactionHash", (hash) => {
          this.setState({
            transactionHash: hash,
            successMessage: "A new Campaign was Successfully Created",
            success: true,
            loading: false,
          });
        });
    } catch (err) {
      this.setState({
        errorMessage: err.message,
        errorCode: err.code,
        negative: true,
        loading: false,
      });

      setTimeout(() => {
        this.setState({
          negative: false,
        });
      }, 5000);
    }
  };

  render() {
    const {
      animation,
      duration,
      errorMessage,
      errorCode,
      loading,
      transactionHash,
      successMessage,
      success,
      negative,
    } = this.state;

    return (
      <Fragment>
        <h1>Create a new Campaign</h1>
        <Form onSubmit={this.createNewCampaign}>
          <Form.Field width={7}>
            <label>Minimum Contribution</label>
            <Input
              label={{ basic: true, content: "wei" }}
              labelPosition="right"
              placeholder="Number"
              onChange={this.getVal}
            />
          </Form.Field>
          <Button
            circular
            loading={loading}
            primary
            animated="vertical"
            type="submit"
          >
            <Button.Content hidden>
              <Icon name="ethereum" />
            </Button.Content>
            <Button.Content visible>Create</Button.Content>
          </Button>
        </Form>
        <Transition
          animation={animation}
          duration={duration}
          visible={negative}
        >
          <Message negative>
            <Message.Header>{errorMessage}</Message.Header>
            <p>{errorCode}</p>
          </Message>
        </Transition>
        <Transition animation={animation} duration={duration} visible={success}>
          <Message success>
            <Message.Header>{successMessage}</Message.Header>
            <p>
              You can see the details by clicking your transaction ID below.
            </p>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://goerli.etherscan.io/tx/${transactionHash}`}
              style={{ fontSize: "20px" }}
            >
              {transactionHash}
            </a>
            <Container textAlign="right">
              <Link to={"/"}>
                <Button circular color="red">
                  Dismiss
                </Button>
              </Link>
            </Container>
          </Message>
        </Transition>
      </Fragment>
    );
  }
}

export default CreateNewCampaign;
