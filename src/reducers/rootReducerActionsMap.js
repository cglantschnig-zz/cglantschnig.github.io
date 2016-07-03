import {bindActionCreators} from "redux";
import {mapValues as _mapValues} from "lodash";

import * as lang from "../reducers/lang/actions";

// this function exports a convenience shortcut to easily trigger any defined actions
export default function getRootReducerActionsMap(dispatch: Function) {

  // any available actions must be bound here to be available for debugging
  const availableActionsCreators = {
    lang,
  };

  return _mapValues(availableActionsCreators, (actions) => {
    return bindActionCreators(actions, dispatch);
  });

}
