import React, {Component, PropTypes} from "react";

import {connect} from "react-redux";

import {routeActions} from "react-router-redux";

// higher order component that injects the react-router router shape object (noormally available on context) as a prop into the overgiven component
export default function connectRouter(TargetComponent) {

  class ConnectRouterContextHOC extends Component { // HOC = Higher Order Component

    render() { // don't use an function shorthand here, react needs to bind this!
      return (<TargetComponent router={this.context.router} {...this.props} />);
    }

  }

  // supply the required context... (must be made this way for es6 classes)
  ConnectRouterContextHOC.contextTypes = {
    router: PropTypes.object.isRequired
  };

  return ConnectRouterContextHOC;
}
