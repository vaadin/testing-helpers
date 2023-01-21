import { fixtureWrapper } from './fixture-wrapper.js';

const templates: Record<string, HTMLTemplateElement | undefined> = {};

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
 * Setups an element synchronously from the provided string template and puts it in the DOM.
 * Uses `document.importNode` to ensure proper custom elements upgrade timings.
 *
 * @template {Element} T - Is an element or a node
 * @param {!string} html
 * @param {Element=} wrapper
 * @return {T}
 */
export function fixtureSync<T extends Element>(html: string, wrapper?: Element): T {
  const tpl = template(html);
  const parentNode = fixtureWrapper(wrapper);
  parentNode.appendChild(document.importNode(tpl.content, true));
  return parentNode.firstElementChild as T;
}
