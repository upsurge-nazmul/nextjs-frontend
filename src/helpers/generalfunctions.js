function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    return window.clipboardData.setData("Text", text);
  } else if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy"); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return prompt("Copy to clipboard: Ctrl+C, Enter", text);
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

function capitalize(string) {
  if (!string) return;
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function getfullname(firstname, lastname) {
  return (firstname + " " + (lastname || "")).trim();
}

function checkIphone() {
  return /iPhone|iPod|iPad/.test(navigator.platforms);
}

const objectValuesToFormattedString = (obj) => {
  return Object.values(obj)
    .map((value, index) => `${index + 1}) ${value}`) // Adding serial number before each value
    .join(", "); // Joining them with a comma and space
};

export {
  copyToClipboard,
  capitalize,
  getfullname,
  checkIphone,
  objectValuesToFormattedString,
};
