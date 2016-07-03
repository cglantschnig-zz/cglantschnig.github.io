import {each as _each, compact as _compact} from "lodash";

// adapted from http://stackoverflow.com/questions/7069584/js-build-object-path-in-property-assignment
// generates a deep object with the overgiven value set, optionally a different base object can be supplied
// e.g.:
// ("a.b", 1) --> {a: {b: 1}}
// ("a", 1) --> {a: 1}
// ("", 1) --> 1
export default function setInDeepObject(path: string = "", value, base = {}) {
  const segments = _compact(path.split("."));

  if (segments.length === 0) {
    return value; // noop just return
  }

  let cursor = base;

  // generate all nests through a cursor and set the value last
  _each(segments, (segment, index) => {
    if (index === segments.length - 1) {
      cursor = cursor[segment] = value;
    } else {
      cursor = cursor[segment] = cursor[segment] || {};
    }
  });

  return base;
}
