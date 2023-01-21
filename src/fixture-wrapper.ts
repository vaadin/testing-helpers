export const cachedWrappers: Element[] = [];

/**
 * Creates a wrapper as a direct child of `<body>` to put the tested element into.
 * Need to be in the DOM to test for example `connectedCallback()` on elements.
 *
 * @param {!Element} parentNode
 * @return {Element} wrapping node
 */
export function fixtureWrapper(parentNode: Element = document.createElement('div')): Element {
  document.body.appendChild(parentNode);
  cachedWrappers.push(parentNode);
  return parentNode;
}

/**
 * Cleans up all defined fixtures by removing the actual wrapper nodes.
 */
export function fixtureCleanup(): void {
  cachedWrappers.forEach((wrapper) => {
    document.body.removeChild(wrapper);
  });
  cachedWrappers.length = 0; // reset it like this as we can't reassign it
}
