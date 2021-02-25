const templates: Record<string, HTMLTemplateElement> = {};

const cachedWrappers: Array<Node> = [];

/**
 * Creates a `<template>` element from a provided string template.
 *
 * @param {string} html
 * @return {HTMLTemplateElement}
 */
function template(html: string): HTMLTemplateElement {
  let tpl = templates[html];
  if (!tpl) {
    tpl = document.createElement('template');
    tpl.innerHTML = html;
    templates[html] = tpl;
  }
  return tpl;
}

/**
 * Creates a wrapper as a direct child of `<body>` to put the tested element into.
 * Need to be in the DOM to test for example `connectedCallback()` on elements.
 *
 * @param {Element} parentNode
 * @return {HTMLElement}
 */
function fixtureWrapper(parentNode = document.createElement('div')): HTMLElement {
  document.body.appendChild(parentNode);
  cachedWrappers.push(parentNode);
  return parentNode;
}

/**
 * Cleans up all defined fixtures by removing the actual wrapper nodes.
 */
export function fixtureCleanup(): void {
  if (cachedWrappers) {
    cachedWrappers.forEach((wrapper) => {
      document.body.removeChild(wrapper);
    });
  }
  cachedWrappers.length = 0; // reset it like this as we can't reassign it
}

/**
 * Setups an element synchronously from the provided string template and puts it in the DOM.
 * Uses `document.importNode` to ensure proper custom elements upgrade timings.
 *
 * @template {Element} T - Is an element or a node
 * @param {string} html
 * @return {T}
 */
export function fixtureSync<T extends Element>(html: string): T {
  const tpl = template(html);
  const parentNode = fixtureWrapper();
  parentNode.appendChild(document.importNode(tpl.content, true));
  return parentNode.firstElementChild as T;
}
