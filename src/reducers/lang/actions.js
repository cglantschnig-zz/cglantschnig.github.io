// import named handled actions from reducer
import {
  LANG_CHANGE_LANGUAGE
}
from "./index";

// any plain sychronous action creator must be FSA compliant,
// see https://github.com/acdlite/flux-standard-action

// public action creators
export function changeLanguage(language) {
  return {
    type: LANG_CHANGE_LANGUAGE,
    payload: {
      locale: language,
      messages: require(`../../i18n/${language}.json`)
    }
  };
}
