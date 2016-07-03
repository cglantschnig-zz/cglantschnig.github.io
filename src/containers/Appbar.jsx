import React, {Component, PropTypes} from "react";

import {Nav, NavbarBrand, Navbar, NavItem, CollapsibleNav} from "react-bootstrap";

import {Link} from "react-router";

import {createSelector} from "reselect";
import {connect} from "react-redux";

import CSSModules from "react-css-modules";

import styles from "./Appbar.less";
import {FormattedMessage} from "react-intl";

import connectRouter from "../decorators/connectRouter";

const LOGOUT_EVENT_KEY = "LOGOUT";
const SIDEBAR_EVENT_KEY = "SIDEBAR";

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
      <div styleName="Appbar">
        <Navbar fluid fixedTop>
          <NavbarBrand>
            <Link styleName="Appbar-brand" to="/">
              <aside><FormattedMessage id="title"/></aside>
            </Link>
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }

}
