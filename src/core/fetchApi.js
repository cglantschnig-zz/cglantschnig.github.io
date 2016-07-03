import {
  FETCH_TIMEOUT_MS,
  FETCH_STATUS_TIMEOUT
} from "../constants";

const queryString = require("query-string");

function checkResponseStatusCode(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response; // decorate the error with the full server response.
  throw error;
}

function autoTimeout(ms, promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = new Error(`autoTimeout after ${ms}ms`);
      error.response = {
        status: FETCH_STATUS_TIMEOUT // decorate the error with a statusCode for the timeout
      };
      reject(error);
    }, ms);
    promise.then(resolve, reject);
  });
}

// parameters are exactly the same like the original fetch function
// see https://github.com/github/fetch

// will automatically timeout and throw errors on non 200 status codes
export default function fetchApi(url: string, options, queryMap: Object = {}) {

  const query = queryString.stringify(queryMap);
  const requestUrl = query.length > 0 ? url + "?" + query : url;

  console.info("request", requestUrl, options);

  return autoTimeout(FETCH_TIMEOUT_MS, fetch(requestUrl, options))
    .then(checkResponseStatusCode)
    .then((response) => {
      console.info("response", requestUrl, response);
      return response;
    });
    // don't catch errors here, the actual action should always handle them!
}
