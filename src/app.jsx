/**
 * Client-side JavaScript main starting point
 */

import React from "react";
import ReactDOM from "react-dom";

import {Provider} from "react-redux";
import {Router, hashHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";

import configureStore from "./store/configureStore";
import getRoutes from "./routes";

import Internationalization from "./containers/Internationalization";

const store = configureStore(hashHistory); // initialState can be passed as 2nd argument here if needed
const enhancedHistory = syncHistoryWithStore(hashHistory, store);

// Required for replaying actions from external devtools to work
// reduxRouterMiddleware.listenForReplays(store);

if (__DEVELOPMENT__) {
  window.store__ = store; // make the store available in the global browser scope
  window.React = React; // enable react debugger tools

  window.actions__ = require("./reducers/rootReducerActionsMap")(store.dispatch); // make the bound actions available in the global browser scope

  // enable the react-performance utilities, see https://facebook.github.io/react/docs/perf.html
  window.Perf = require("react-addons-perf");
}

const routes = getRoutes(store);
const appWrapperClassName = "app-wrapper";

const AppWrapper = React.createClass({

  render() {

    return (
      <div className={appWrapperClassName}>
        <Provider store={store} key="provider">
          <Internationalization>
            <div>
              <Router history={enhancedHistory}>
                {routes}
              </Router>
            </div>
          </Internationalization>
        </Provider>
      </div>
    );
  }

});

ReactDOM.render(< AppWrapper />, document.getElementById("app")); // attach the app
