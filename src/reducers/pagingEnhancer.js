/*

  Generalized reducer enhancer for a certain problem domain
  Handles list pagination state

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

// some project specific constants
import {
  DEFAULT_PAGINATION_LIMIT_COUNT,
  DEFAULT_LIST_SORT_METHOD
} from "../constants";

import selectn from "selectn";

/*

  Reducer Enhancer State
  ----------------------

  - Define the state schema this reducer enhancer complies to and export it so this can be reused.
  - Define the initial state of this reducer enhancer (must conform to the above Schema)

*/

export const PagingEnhancerSchema = t.struct({
  total: t.Number,
  offset: t.Number,
  limit: t.Number,
  currentSortItem: t.String,
  sortMethod: t.String,
  filter: t.String,
});

export const pagingEnhancerInitialState = PagingEnhancerSchema({
  total: 0,
  offset: 0,
  limit: DEFAULT_PAGINATION_LIMIT_COUNT,
  currentSortItem: "id",
  sortMethod: DEFAULT_LIST_SORT_METHOD,
  filter: "",
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

export function handleActionPaginate(ReducerSchema: Function, keyPath: string = "") {
  return (state, action) => {
    return ReducerSchema.update(state, setInDeepObject(keyPath, {
      offset: {
        $set: action.payload.offset
      },
      limit: {
        $set: action.payload.limit
      }
    }));
  };
}

export function handleActionChangeSortItem(ReducerSchema: Function, keyPath: string = "") {
  return (state, action) => {
    // switch sortMethod to DESC if a new item was selected.
    let sortMethod = DEFAULT_LIST_SORT_METHOD; // descending by default.

    if (selectn(keyPath + ".currentSortItem", state) === action.payload.currentSortItem) {
      sortMethod = selectn(keyPath + ".sortMethod", state) === "DESC" ? "ASC" : "DESC";
    }

    return ReducerSchema.update(state, setInDeepObject(keyPath, {
      currentSortItem: {
        $set: action.payload.currentSortItem
      },
      sortMethod: {
        $set: sortMethod
      }
    }));

  };
}

export function handleActionSetFilter(ReducerSchema: Function, keyPath: string = "") {
  return (state, action) => {
    return ReducerSchema.update(state, setInDeepObject(keyPath, {
      filter: {
        $set: action.payload.filter
      },
      offset: {
        $set: 0 // rollback to no offset for pagination.
      }
    }));
  };
}

export function handleActionResetPaging(ReducerSchema: Function, keyPath: string = "") {
  return (state, action) => {
    return ReducerSchema.update(state, setInDeepObject(keyPath, {
      offset: {
        $set: pagingEnhancerInitialState.offset
      },
      total: {
        $set: pagingEnhancerInitialState.total
      },
      filter: {
        $set: pagingEnhancerInitialState.filter
      },
      currentSortItem: {
        $set: pagingEnhancerInitialState.currentSortItem // use default from initialState
      },
      sortMethod: {
        $set: pagingEnhancerInitialState.sortMethod // use default from initialState
      }
    }));
  };
}

export function handleActionSetTotal(ReducerSchema: Function, keyPath: string = "") {
  return (state, action) => {
    return ReducerSchema.update(state, setInDeepObject(keyPath, {
      total: {
        $set: action.payload.total
      },
    }));
  };
}

/*

  Reducer Enhancer Action Creators
  --------------------------------

  these public action creators that can be mixed into actions from a specific reducer
  - the used actionType constant within the extended reducer handler must be overgiven to return a proper action creator

*/

export function createActionPaginate(actionType: string) {
  return createAction(actionType, (offset: number, limit: number) => ({
    offset,
    limit
  }));
}

export function createActionChangeSortItem(actionType: string) {
  return createAction(actionType, (currentSortItem: string) => ({
    currentSortItem
  }));
}

export function createActionSetFilter(actionType: string) {
  return createAction(actionType, (filter: string) => ({
    filter
  }));
}
