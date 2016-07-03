import React from "react";
import {IndexRoute, Route} from "react-router";

import {
  ensureAuthenticatedOnEnter,
  ensureAuthenticatedOnUpdate,
  toAuthenticatedOnEnter,
  toAuthenticatedOnUpdate,
  DEFAULT_LOGIN_PATH,
  DEFAULT_AUTHENTICATED_PATH
} from "./decorators/routeAuthentication";

export default function getRoutes(store) {

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route component={ require("./containers/App") }>
      <Route component={ require("./containers/Test") } path="/" />
    </Route>
  );
}
