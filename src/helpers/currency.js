export default function changetoint(value) {
  if (!value) return 0;
  return isNaN(parseInt(value.toString().replace(/,/g, "")))
    ? 0
    : parseInt(value.toString().replace(/,/g, ""));
}
