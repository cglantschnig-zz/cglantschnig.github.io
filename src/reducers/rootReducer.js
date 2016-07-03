// utility function to combine child reducers into one root reducer
import { combineReducers } from "redux";

// import our child reducers...
import { routerReducer } from "react-router-redux";
import lang from "./lang";

// the default root reducer
const rootReducer = combineReducers({
  lang,
  routing: routerReducer,
});

export default rootReducer;
