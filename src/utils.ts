import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

/**
 * Resolves after provided amount of milliseconds.
 *
 * @param {number} ms Milliseconds.
 * @return {Promise<void>} Promise to await until time is up
 */
export function aTimeout(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Adds a listener
 *
 * @param {Element} target Target of the event, usually an Element
 * @param {string} eventName Name of the event
 * @param {Function} callback Callback to be called in the listener
 * @return {void}
 */
export const listenOnce = (target: Element, eventName: string, callback: (ev: Event) => void): void => {
  const listener = (event: Event) => {
    target.removeEventListener(eventName, listener);
    callback(event);
  };
  target.addEventListener(eventName, listener);
};

/**
 * Resolves after requestAnimationFrame.
 *
 * @return {Promise<void>} Promise resolved after requestAnimationFrame
 */
export function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
}

/**
 * Resolves after afterNextRender Polymer hook.
 *
 * @return {Promise<void>} Promise resolved after next render
 */
export const nextRender = (target: Node): Promise<void> => {
  return new Promise((resolve) => {
    afterNextRender(target, () => {
      resolve();
    });
  });
};

/**
 * Listens for one event and resolves with this event object after it was fired.
 *
 * @param {EventTarget} target Target of the event, usually an Element
 * @param {string} eventName Name of the event
 * @return {Promise<CustomEvent>} Promise to await until the event has been fired
 */
export function oneEvent(target: Element, eventName: string): Promise<CustomEvent> {
  return new Promise((resolve) => {
    listenOnce(target, eventName, (event) => {
      resolve(event as CustomEvent);
    });
  });
}
