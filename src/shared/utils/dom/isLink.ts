export function isLink(element: EventTarget | null) {
  return element instanceof Element && element.closest('a') !== null;
}
