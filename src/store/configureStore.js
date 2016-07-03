import {
  compose,
  createStore,
  applyMiddleware
}
from "redux";
import rootReducer from "../reducers/rootReducer";

import thunk from "redux-thunk"; // thunk action creators
import { apiMiddleware } from "redux-api-middleware"; // middleware for handling api calling action creators

import { routerMiddleware } from "react-router-redux";

import {
  persistStore
}
from "redux-persist"; // persistance layer

import {
  REHYDRATE
} from "redux-persist/constants";

export default function configureStore(reactRouterSingletonHistory, initialState) {

  // general middlewares
  const middlewares = [
    routerMiddleware(reactRouterSingletonHistory), // must be passed from main app entry point.
    thunk, // FSA compliant async "thunk" operations
    apiMiddleware // RSAA compliant api calling middleware
  ];

  // Middlewares for dev-only usage...
  if (__DEVELOPMENT__) {
    // proper console logging of dispatched actions
    middlewares.push(require("redux-logger")());

    // make sure all dispatched actions are compliant to the flux-standard-action spec
    // see https://github.com/acdlite/flux-standard-action for more information
    // this middleware accepts a param with ignored action types (only use for 3rd party libs) which should not be validated (e.g. REHYDRATE is not compliant as it uses a extra key property)
    middlewares.push(require("redux-validate-fsa")([REHYDRATE]));
  }

  // compose our single-truth store...
  const store = compose(
    applyMiddleware(...middlewares),
    typeof window === "object" && typeof window.devToolsExtension !== "undefined" ? window.devToolsExtension() : (f) => f
  )(createStore)(rootReducer, initialState);

  // enable localStorage persistance layer... (attention, do not use autorehydrate as it blocks dispatch calls!
  // instead the reducers that need rehydration must implement the REHYDRATE handler (and if needed the COMPLETE rehydration handler))
  persistStore(store, {
    whitelist: ["auth", "app"], // whitelist reducers that should be only rehydrated.
  });

  // Enable Webpack hot module replacement for reducers
  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept("../reducers/rootReducer", () => {
      const nextReducer = require("../reducers/rootReducer");
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
