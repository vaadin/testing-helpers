import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

let defineCECounter = 0;

type Constructor<T> = new (...args: any[]) => T; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Registers a new element with an automatically generated unique name.
 * @param {Constructor<T>} klass Class which extends HTMLElement
 * @return {string} Tag name of the registered element
 */
export function defineCE(klass: Constructor<HTMLElement>): string {
  const tag = `test-${defineCECounter}`;
  customElements.define(tag, klass);
  defineCECounter += 1;
  return tag;
}

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
export function listenOnce(target: Element, eventName: string, callback: (ev: Event) => void): void {
  const listener = (event: Event) => {
    target.removeEventListener(eventName, listener);
    callback(event);
  };
  target.addEventListener(eventName, listener);
}

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
export function nextRender(target: Node): Promise<void> {
  return new Promise((resolve) => {
    afterNextRender(target, () => {
      resolve();
    });
  });
}

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
