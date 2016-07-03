// this file should hold general constants which are relevant for the application
// however, no reducer specific constants should be defined here
// see https://github.com/erikras/ducks-modular-redux

// cms scope permissions are required throughout this application
// (minimal requirement for user to authenticate and authorize)
export const DEFAULT_USER_AUTHORIZATION_SCOPE = "cms";

// i18n default locale
export const I18N_DEFAULT_LOCALE = "de";

// api fetch settings
export const FETCH_TIMEOUT_MS = 30000;

// general http status codes
export const FETCH_STATUS_UNAUTHORIZED = 401;
export const FETCH_STATUS_FORBIDDEN = 403;
export const FETCH_STATUS_NOT_FOUND = 404;
export const FETCH_STATUS_UNPROCESSABLE_ENTITY = 422;

// custom status codes
export const FETCH_STATUS_TIMEOUT = 999;

// misc constant exports
export const DEFAULT_LIST_SORT_METHOD = "ASC";
export const DEFAULT_PAGINATION_LIMIT_COUNT = 20;
