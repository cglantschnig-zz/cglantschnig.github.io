import React, {Component, PropTypes} from "react";
import selectn from "selectn";
import {connect} from "react-redux";
import connectRouter from "./connectRouter";

// default constants (these can be overwritten through the public hook or HOC function exports signatures)

// /login is by default expected to be the route path were authentication takes place
export const DEFAULT_LOGIN_PATH = "/login";

// / is by default expected to be the route path were authenticated users will be transitioned to
export const DEFAULT_AUTHENTICATED_PATH = "/";

// reducer default path to the redux reducer flag indicating if we are authenticated currently
export const DEFAULT_IS_AUTHENTICATED_REDUCER_PROPERTY_PATH = "auth.isAuthenticated";

// private function that does the router replacing operations for us when we are not authenticated.
function _ensureAuthenticatedTransition(replace : Function, isAuthenticated : boolean, loginPath : string, pathname : string) {
  if (isAuthenticated === false) {

    if (__DEVELOPMENT__) {
      console.log(`_ensureAuthenticatedTransition executes. isAuthenticated=${isAuthenticated} loginPath=${loginPath} pathname=${pathname}`);
    }

    // user is not allowed to access this route while unauthenticated, replace the route now
    // no longer authenticated, transition to the login page!
    // redirect to login and add next param so we can redirect again after login
    // notice that we do this through the router itself, not through the dispatch (faster, plus we don't need to wait for rehydration to take place)
    replace(`${loginPath}?next=${pathname}`);
  }
}

// private function that does the router replacing operations for us when we are getting authenticated.
function _toAuthenticatedTransition(replace : Function, isAuthenticated : boolean, authenticatedPath : string, nextPath) {
  if (isAuthenticated === true) {

    if (__DEVELOPMENT__) {
      console.log(`_toAuthenticatedTransition executes. isAuthenticated=${isAuthenticated} nextPath=${nextPath} authenticatedPath=${authenticatedPath}`);
    }

    // we are now authenticated, transition to the default authenticatedPath or nextPath (if set)
    // notice that we use the router here directly and not through dispatch (no need to wait for rehydration)
    if (nextPath) {
      return replace(nextPath);
    }

    return replace(authenticatedPath);
  }

  return true;
}

// public react-router route onEnter shortcut hook to check authentication reducer (without rendering the route)
export function ensureAuthenticatedOnEnter(store, loginPath : string = DEFAULT_LOGIN_PATH, isAuthenticatedReducerPropertyPath : string = DEFAULT_IS_AUTHENTICATED_REDUCER_PROPERTY_PATH) {
  return function onEnterAuthenticatedRoute(routerNextState, replace) {
    _ensureAuthenticatedTransition(replace, selectn(isAuthenticatedReducerPropertyPath, store.getState()), loginPath, routerNextState.location.pathname);
  };
}

// public react-router route onEnter shortcut hook to check authentication reducer (without rendering the route)
export function toAuthenticatedOnEnter(store, authenticatedPath : string = DEFAULT_AUTHENTICATED_PATH, isAuthenticatedReducerPropertyPath : string = DEFAULT_IS_AUTHENTICATED_REDUCER_PROPERTY_PATH) {
  return function onEnterAuthenticatedRoute(routerNextState, replace) {
    _toAuthenticatedTransition(replace, selectn(isAuthenticatedReducerPropertyPath, store.getState()), authenticatedPath, routerNextState.location.query.next);
  };
}

// public re-checks on any updates of a encapsulated route component (route already rendered)
export function ensureAuthenticatedOnUpdate(RouteTargetComponent, loginPath : string = DEFAULT_LOGIN_PATH, isAuthenticatedReducerPropertyPath : string = DEFAULT_IS_AUTHENTICATED_REDUCER_PROPERTY_PATH) {

  @connectRouter
  @connect((state, ownProps) => {
    return {isAuthenticated: selectn(isAuthenticatedReducerPropertyPath, state), pathname: ownProps.location.pathname};
  })
  class EnsureAuthenticatedHOC extends Component { // HOC = Higher Order Component

    static propTypes = {
      router: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool.isRequired,
      pathname: PropTypes.string.isRequired
    };

    componentDidMount() {
      const {router, isAuthenticated, pathname} = this.props;
      // Component will mount for the first time... (safety check, should be handled automatically by ensureAuthenticatedOnEnter if setup correctly)
      _ensureAuthenticatedTransition(router.replace, isAuthenticated, loginPath, pathname);
    }

    componentWillReceiveProps(nextProps) {
      const {router, isAuthenticated, pathname} = nextProps;
      // Component has updated, recheck if we are still authenticated (transitions to logout if no longer logged in)...
      _ensureAuthenticatedTransition(router.replace, isAuthenticated, loginPath, pathname);
    }

    render() {
      // render the component that requires auth (passed to this wrapper)
      return (<RouteTargetComponent {...this.props}/>);
    }
  }

  return EnsureAuthenticatedHOC;
}

// re-checks on any updates of a encapsulated route component (route already rendered)
export function toAuthenticatedOnUpdate(RouteTargetComponent, authenticatedPath : string = DEFAULT_AUTHENTICATED_PATH, isAuthenticatedReducerPropertyPath : string = DEFAULT_IS_AUTHENTICATED_REDUCER_PROPERTY_PATH) {

  @connectRouter
  @connect((state, ownProps) => {
    const query = Object.assign({}, ownProps.location.query); // query can also be undefined, catch this and always supply an object.
    return {
      isAuthenticated: selectn(isAuthenticatedReducerPropertyPath, state),
      query
    };
  }) // eslint disable only for this line to allow another component to be defined in the same file.
  class TransitionsOnAuthenticatedHOC extends Component { // eslint-disable-line react/no-multi-comp

    static propTypes = {
      router: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool.isRequired,
      query: PropTypes.object.isRequired
    };

    componentDidMount() {
      const {router, isAuthenticated, query} = this.props;
      // handle cases were we are already authenticated when mount occured, no need to show this page.
      _toAuthenticatedTransition(router.replace, isAuthenticated, authenticatedPath, query.next);
    }

    componentWillReceiveProps(nextProps) {
      const {router, isAuthenticated, query} = nextProps;
      // handle cases were we get authenticated after logging in successfully
      _toAuthenticatedTransition(router.replace, isAuthenticated, authenticatedPath, query.next);
    }

    render() {
      // render the component that requires auth (passed to this wrapper)
      return (<RouteTargetComponent {...this.props}/>);
    }
  }

  return TransitionsOnAuthenticatedHOC;
}
