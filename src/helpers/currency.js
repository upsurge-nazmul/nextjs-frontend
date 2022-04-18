export default function changetoint(value) {
  if (!value) return 0;
  return isNaN(parseInt(value.toString().replace(/,/g, "")))
    ? 0
    : parseInt(value.toString().replace(/,/g, ""));
}

export function toIndianFormat(value) {
  return value
    ? value.toLocaleString("en-IN", {
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : 0;
}
