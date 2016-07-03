import * as t from "tcomb-validation";
import {isFinite as _isFinite, parseInt as _parseInt, trim as _trim, isString as _isString} from "lodash";

import moment from "moment";

// these constrained types are used for the model validations, or directly within the reducer state schemas

export const Integer = t.subtype(t.Number, (val) => {
  return _isFinite(val) && val % 1 === 0;
});

export const PositiveOrZeroInteger = t.subtype(t.Number, (val) => {
  return (val > 0 && _isFinite(val) && val % 1 === 0) || (val === 0);
});

export const PositiveNonZeroInteger = t.subtype(t.Number, (val) => {
  return val > 0 && _isFinite(val) && val % 1 === 0;
});

export const NumericString = t.subtype(t.String, (val) => {
  return _isFinite(_parseInt(val)) === true && _isFinite(_parseInt(val)) > 0;
});

export const NonEmptyString = t.subtype(t.String, (val) => {
  return _trim(val).length > 0;
});

export const IsoDateString = t.subtype(t.String, (val) => {
  return moment(val).isValid() === true;
});
