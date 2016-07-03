// Helper utilities to work with date WITHOUT using momentjs (which is just to big to use for most clientside project!)

export function applyMillisecondsToCurrentDate(milliseconds: number) {

  // via http://stackoverflow.com/questions/12795767/trying-to-add-3-days-in-milliseconds-to-current-date
  // get the current date & time
  let dateObj = Date.now();

  // Add 3 days to the current date & time
  //   I'd suggest using the calculated static value instead of doing inline math
  //   I did it this way to simply show where the number came from
  dateObj += milliseconds;

  // create a new Date object, using the adjusted time
  return new Date(dateObj);
}


// attention, returns false if a null date was provided!
export function isDateBeforeNow(date) {
  if (!date) {
    return false;
  }

  const now = new Date();

  if (date < now) {
    return true;
  }

  return false;
}
