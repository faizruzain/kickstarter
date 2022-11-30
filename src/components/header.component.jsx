import React, { Component, Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

class Header extends Component {
  render() {
    return (
      <Fragment>
        <Menu>
          <Link to={"/"}>
            <Menu.Item link>CrownCoin</Menu.Item>
          </Link>

          <Menu.Menu position="right">
            <Link to={"/"}>
              <Menu.Item link>Campaigns</Menu.Item>
            </Link>

            <Link to={"/campaigns/new"}>
              <Menu.Item link>
                <Icon name="plus circle" />
              </Menu.Item>
            </Link>
          </Menu.Menu>
        </Menu>
        <Outlet />
      </Fragment>
    );
  }
}

export default Header;
