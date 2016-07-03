import React, {Component, PropTypes} from "react";

import {Nav, NavbarBrand, Navbar, NavItem, CollapsibleNav, Container} from "react-bootstrap";

import {Link} from "react-router";

import {createSelector} from "reselect";
import {connect} from "react-redux";

import CSSModules from "react-css-modules";

import styles from "./Appbar.less";
import {FormattedMessage} from "react-intl";

import connectRouter from "../decorators/connectRouter";

const logo = require("../assets/img/glantschnig-pro-top.png");

@connectRouter
@connect()
@CSSModules(styles)
export default class Appbar extends Component {

  static propTypes = {
    router: PropTypes.object.isRequired,
    username: PropTypes.string, // optional
    dispatch: PropTypes.func.isRequired
  };

  render() {
    const {router} = this.props;

    return (
      <div styleName="Appbar" className="appbar">
        <Navbar fixedTop>
            <NavbarBrand>
              <Link styleName="Appbar-brand" to="/">
                <aside><img src={logo} /></aside>
              </Link>
            </NavbarBrand>
            <Nav pullRight>
              <NavItem eventKey={1} styleName="navbar-link-item" href="https://github.com/cglantschnig" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></NavItem>
              <NavItem eventKey={2} styleName="navbar-link-item" href="http://stackoverflow.com/users/1164646/safari" target="_blank"><i className="fa fa-stack-overflow" aria-hidden="true"></i></NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }

}
