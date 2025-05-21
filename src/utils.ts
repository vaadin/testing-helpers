let defineCECounter = 0;

export type Constructor<T> = new (..._args: any[]) => T; // eslint-disable-line @typescript-eslint/no-explicit-any

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
export async function aTimeout(ms: number): Promise<void> {
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
export function listenOnce(target: Element, eventName: string, callback: (_ev: Event) => void): void {
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
export async function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
}

/**
 * Resolves after the next render, by runing after one task (`setTimout`)
 * after the next `requestAnimationFrame`
 *
 * @return {Promise<void>} Promise resolved after next render
 */
export async function nextRender(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      setTimeout(() => resolve());
    });
  });
}

/**
 * Resolves after the next resize event of the given element.
 *
 * @param {Element} target Element to observe for resize events
 * @return {Promise<void>} Promise resolved after the resize event
 */
export const nextResize = async (target: Element): Promise<void> =>
  new Promise((resolve) => {
    new ResizeObserver((_, observer) => {
      observer.disconnect();
      setTimeout(resolve);
    }).observe(target);
  });

/**
 * Listens for one event and resolves with this event object after it was fired.
 *
 * @param {EventTarget} target Target of the event, usually an Element
 * @param {string} eventName Name of the event
 * @return {Promise<CustomEvent>} Promise to await until the event has been fired
 */
export async function oneEvent(target: Element, eventName: string): Promise<CustomEvent> {
  return new Promise((resolve) => {
    listenOnce(target, eventName, (event) => {
      resolve(event as CustomEvent);
    });
  });
}

const isDefinedPromise = (action: unknown) => typeof action === 'object' && Promise.resolve(action) === action;

/**
 * Awaits for "update complete" of the Lit based element,
 * or for one frame via `await nextFrame()` otherwise.
 *
 * @param {HTMLElement} el
 * @return {Promise<HTMLElement>}
 */
export async function nextUpdate(el?: HTMLElement): Promise<void> {
  // @ts-expect-error Incorrect type
  const update = el?.updateComplete;
  if (isDefinedPromise(update)) {
    await update;
  } else {
    await nextFrame();
  }
}
