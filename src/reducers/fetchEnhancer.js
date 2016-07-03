/*

  Generalized reducer enhancer for a certain problem domain
  Handles redux-api-middleware related actions, see https://github.com/agraboso/redux-api-middleware

  This can be mixed or composed into any reducer
  - exports extendable schema  --> ${EnhancerName}Schema
  - exports initial state      --> ${enhancerName}InitialState
  - exports action handling(s) --> handleAction${Action}
  - exports action creator(s)) --> createAction${Action}

*/

// Immutable schema helper module
import * as t from "tcomb-validation";

// Helper for generating the tcomb immutable update calls in deeper keypathed reducers (when enhancer was not mixedin but composed in reducer)
import setInDeepObject from "../core/setInDeepObject";

// Reduce required boilerplate in creating FSA compliant action creators (see https://github.com/acdlite/redux-actions)
import {
  createAction
} from "redux-actions";

import selectn from "selectn";

/*

  Reducer Enhancer State
  ----------------------

  - Define the state schema this reducer enhancer complies to and export it so this can be reused.
  - Define the initial state of this reducer enhancer (must conform to the above Schema)

*/

export const FetchEnhancerSchema = t.struct({
  isLoading: t.Boolean,
  isError: t.Boolean,
  error: t.maybe(t.String),
  errorStatus: t.maybe(t.Number),
});

export const fetchEnhancerInitialState = FetchEnhancerSchema({
  isLoading: false,
  isError: false,
  error: null,
  errorStatus: null,
});

/*

  Reducer Enhancer Action Handlers
  --------------------------------

  - ReducerSchema must be a extended subtype of the above defined schema to use these handlers
  - an optional keypath to the property can be specified
    - useful if this reducer enhancer was not mixed into the ReducerSchema but composed through a separate property key)
    - the keypath is injected to the setInDeepObject function to get a proper object back if the state was composed deeper (not mixed in to the ReducerSchema)
    - hence we automatically get a proper updateObject for the specified ReducerSchema

*/

export function handleActionFetch(ReducerSchema: Function, keyPath: string = "") {
  return (state, action) => {

    if (action.error) { // handle fetch errors that were encounted before the actual request occured
      return ReducerSchema.update(state, setInDeepObject(keyPath, {
        isLoading: {
          $set: false
        },
        isError: {
          $set: true
        },
        error: {
          $set: action.payload.message ? action.payload.message : action.payload.name
        },
        errorStatus: {
          $set: action.payload.status ? action.payload.status : null
        },
      }));
    }

    return ReducerSchema.update(state, setInDeepObject(keyPath, {
      isLoading: {
        $set: true
      },
      isError: {
        $set: false
      },
      error: {
        $set: null
      },
      errorStatus: {
        $set: null
      },
    }));
  };
}

export function handleActionFetchSuccess(ReducerSchema: Function, keyPath: string = "") {
  return (state, action) => {
    return ReducerSchema.update(state, setInDeepObject(keyPath, {
      isLoading: {
        $set: false
      }
    }));
  };
}

export function handleActionFetchFailed(ReducerSchema: Function, keyPath: string = "") {
  return (state, action) => {

    const detailedErrorMessage = selectn("payload.response.message", action);
    const genericErrorMessage = action.payload.message ? action.payload.message : action.payload.name; // assert that a name is always available
    const usedErrorMessage = detailedErrorMessage ? detailedErrorMessage : genericErrorMessage;

    return ReducerSchema.update(state, setInDeepObject(keyPath, {
      isLoading: {
        $set: false
      },
      isError: {
        $set: true
      },
      error: {
        $set: usedErrorMessage
      },
      errorStatus: {
        $set: action.payload.status ? action.payload.status : null
      },
    }));
  };
}

export function handleActionDismissError(ReducerSchema: Function, keyPath: string = "") {
  return (state, action) => {
    return ReducerSchema.update(state, setInDeepObject(keyPath, {
      isError: {
        $set: false
      },
      error: {
        $set: null
      },
      errorStatus: {
        $set: null
      }
    }));
  };
}


/*

  Reducer Enhancer Action Creators
  --------------------------------

  these public action creators that can be mixed into actions from a specific reducer
  - the used actionType constant within the extended reducer handler must be overgiven to return a proper action creator

*/

// no fetch actioncreators are exported, dispatching actiontypes for the above handlers automatically work with redux-api-middleware actions

export function createActionDismissError(actionType: string) {
  return createAction(actionType);
}
