export function onlyText(data) {
  if (data.match(/\d+/g)) {
    return false;
  }
  if (data.search(/[!@#$%^&*]/) > 0) {
    return false;
  }
  return true;
}
