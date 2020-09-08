export function cap(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function selectText(el) {
  if (document.selection) { // IE
      var range = document.body.createTextRange();
      range.moveToElementText(el);
      range.select();
  } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(el);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
  }
};

export function copy(val) {
  try {
    navigator.clipboard.writeText(val);
  } catch (e) {}
}
