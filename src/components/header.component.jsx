import React, { Component, Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

class Header extends Component {
  render() {
    return (
      <Fragment>
        <Menu>
          <Menu.Item>CrownCoin</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>Campaigns</Menu.Item>
            <Menu.Item>
              <Icon name="plus circle" />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Outlet />
      </Fragment>
    );
  }
}

export default Header;
