import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";

class MyButton extends Component {
  render() {
    return (
      <Button floated="right" primary icon labelPosition="left">
        <Icon name="plus" />
        Add Campaign
      </Button>
    );
  }
}

export default MyButton;
