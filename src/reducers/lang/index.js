// Define the action constants this reducer handles and exports for its actions
// structure is based on https://github.com/erikras/ducks-modular-redux
export const LANG_CHANGE_LANGUAGE = "lang/LANG_CHANGE_LANGUAGE";

// Reduce boilerplate via this reducer enhancer which binds action types to their handlers function (see https://github.com/acdlite/redux-actions)
import {
  handleActions
} from "redux-actions";

// Immutable schema helper module
import * as t from "tcomb-validation";

// add general localedata for the selected lanaugaes directly to the bundle...
import {
  addLocaleData
} from "react-intl";

import de from "react-intl/lib/locale-data/de"; // TODO: preload this at runtime, don't include the i18n config here!
addLocaleData(de); // TODO execute this after locale data was loaded and not here directly!

// Define the state schema this reducer complies to and export it so this can be reused.
export const LangSchema = t.struct({
  locale: t.String,
  parentLocale: t.String,
  messages: t.Object
}, "LangSchema");

// Define the initial state of this reducer (must conform to the above Schema)
const initialState = LangSchema({
  locale: "de",
  parentLocale: "de",
  messages: require("../../i18n/de.json")
});

// Define the reducing function...
export default handleActions({

  [LANG_CHANGE_LANGUAGE]: (state, action) => {
    return LangSchema.update(state, {
      locale: {
        $set: action.payload.locale
      },
      messages: {
        $set: action.payload.messages
      }
    });
  }

}, initialState);
