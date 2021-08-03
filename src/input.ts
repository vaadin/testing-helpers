import { fire } from './events.js';
import { keyDownOn } from './keyboard.js';

/**
 * Dispatches a change event on the given node.
 */
export function change(node: Node): Event {
  // Native change event is not composed
  const eventProps = { composed: false };
  return fire(node, 'change', undefined, eventProps);
}

/**
 * Appends a char to the node value and fires input event.
 */
export function inputChar(node: Element, char: string): Event {
  (node as HTMLInputElement).value += char;
  keyDownOn(node, char.charCodeAt(0));
  return fire(node, 'input', undefined, {});
}

/**
 * Appends a string to the node value and fires input event.
 */
export function inputText(node: Element, text: string): void {
  for (let i = 0; i < text.length; i++) {
    inputChar(node, text[i]);
  }
}
