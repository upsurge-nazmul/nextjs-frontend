export function completedtimeDifference(diff) {
  let current = new Date().getTime();
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  var elapsed = current - diff;
  if (elapsed < msPerMinute) {
    return "Completed " + Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return "Completed " + Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return "Completed " + Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return "Completed " + Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return "Completed " + Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return "Completed " + Math.round(elapsed / msPerYear) + " years ago";
  }
}
export function duetimeDifference(diff) {
  let current = new Date().getTime();
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  var elapsed = diff - current;
  if (elapsed < 0) {
    return "Expired";
  }
  if (elapsed < msPerMinute) {
    return "Due " + Math.round(elapsed / 1000) + " in seconds";
  } else if (elapsed < msPerHour) {
    return "Due " + Math.round(elapsed / msPerMinute) + " in minutes";
  } else if (elapsed < msPerDay) {
    return "Due " + Math.round(elapsed / msPerHour) + " in hours";
  } else if (elapsed < msPerMonth) {
    return "Due " + Math.round(elapsed / msPerDay) + " in days";
  } else if (elapsed < msPerYear) {
    return "Due " + Math.round(elapsed / msPerMonth) + " in months";
  } else {
    return "Due " + Math.round(elapsed / msPerYear) + " in years";
  }
}

export function getRelativeTime(previous) {
  let current = new Date().getTime();
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}

export function getIndianTime(timestamp, sign) {
  const date = new Date(Number(timestamp));
  return `${date.getDate()}${sign ? sign : "/"}${
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0` + (date.getMonth() + 1)
  }${sign ? sign : "/"}${date.getFullYear()}`;
}

export function getMonthsLeft(diff) {
  let current = new Date().getTime();
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var elapsed = Number(diff) - current;
  if (elapsed < 0) {
    return 0;
  }
  return Math.round(elapsed / msPerMonth);
}

export function getMonthYearOnly(timestamp) {
  const date = new Date(Number(timestamp));
  return `${
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0` + (date.getMonth() + 1)
  }/${date.getFullYear().toString().substring(2)}`;
}
