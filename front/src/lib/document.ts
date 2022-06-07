export function setCaretAtTheEndOFTheDocument(ref: any) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(ref);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}
