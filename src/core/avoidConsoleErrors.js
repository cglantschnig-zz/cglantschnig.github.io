// Fuck IE: Avoid console errors in browsers that lack a console.
(function avoidConsoleErrors() { // IFFE
  const noop = function noop() {};
  const methods = [
    "assert", "clear", "count", "debug", "dir", "dirxml", "error",
    "exception", "group", "groupCollapsed", "groupEnd", "info", "log",
    "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd",
    "timeline", "timelineEnd", "timeStamp", "trace", "warn"
  ];
  let length = methods.length;
  const console = (window.console = window.console || {});

  while (length--) {
    const method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());
