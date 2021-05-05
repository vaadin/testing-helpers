/**
 * Returns a keyboard event. This event bubbles and is cancellable.
 */
export function keyboardEventFor(
  type: string,
  keyCode: number,
  modifiers: string | string[] = [],
  key?: string
): CustomEvent {
  const event = new CustomEvent(type, {
    detail: 0,
    bubbles: true,
    cancelable: true,
    composed: true
  });

  // @ts-expect-error: emulate KeyboardEvent
  event.keyCode = keyCode;

  // @ts-expect-error: emulate KeyboardEvent
  event.code = keyCode;

  const modifierKeys = typeof modifiers === 'string' ? [modifiers] : modifiers;

  // @ts-expect-error: emulate KeyboardEvent
  event.shiftKey = modifierKeys.indexOf('shift') !== -1;

  // @ts-expect-error: emulate KeyboardEvent
  event.altKey = modifierKeys.indexOf('alt') !== -1;

  // @ts-expect-error: emulate KeyboardEvent
  event.ctrlKey = modifierKeys.indexOf('ctrl') !== -1;

  // @ts-expect-error: emulate KeyboardEvent
  event.metaKey = modifierKeys.indexOf('meta') !== -1;

  // @ts-expect-error: emulate KeyboardEvent
  event.key = key;

  return event;
}

/**
 * Fires a keyboard event on a specific node. This event bubbles and is
 * cancellable.
 */
export function keyEventOn(
  target: Element,
  type: string,
  keyCode: number,
  modifiers: string | string[] = [],
  key?: string
): void {
  target.dispatchEvent(keyboardEventFor(type, keyCode, modifiers, key));
}

/**
 * Fires a 'keydown' event on a specific node. This event bubbles and is
 * cancellable.
 */
export function keyDownOn(target: Element, keyCode: number, modifiers: string | string[] = [], key?: string): void {
  keyEventOn(target, 'keydown', keyCode, modifiers, key);
}

/**
 * Fires a 'keyup' event on a specific node. This event bubbles and is
 * cancellable.
 */
export function keyUpOn(target: Element, keyCode: number, modifiers: string | string[] = [], key?: string): void {
  keyEventOn(target, 'keyup', keyCode, modifiers, key);
}

export function keyDownChar(target: Element, letter: string, modifiers: string | string[] = []): void {
  keyDownOn(target, letter.charCodeAt(0), modifiers, letter);
}

export function tabKeyDown(target: Element, modifiers: string | string[] = []): void {
  keyDownOn(target, 9, modifiers, 'Tab');
}

export function tabKeyUp(target: Element, modifiers: string | string[] = []): void {
  keyUpOn(target, 9, modifiers, 'Tab');
}

export function tab(target: Element, modifiers: string | string[] = []): void {
  tabKeyDown(target, modifiers);
  tabKeyUp(target, modifiers);
}

export function arrowDownKeyDown(target: Element, modifiers: string | string[] = []): void {
  keyDownOn(target, 40, modifiers, 'ArrowDown');
}

export function arrowDownKeyUp(target: Element, modifiers: string | string[] = []): void {
  keyUpOn(target, 40, modifiers, 'ArrowDown');
}

export function arrowDown(target: Element, modifiers: string | string[] = []): void {
  arrowDownKeyDown(target, modifiers);
  arrowDownKeyUp(target, modifiers);
}

export function arrowLeftKeyDown(target: Element, modifiers: string | string[] = []): void {
  keyDownOn(target, 37, modifiers, 'ArrowLeft');
}

export function arrowLeftKeyUp(target: Element, modifiers: string | string[] = []): void {
  keyUpOn(target, 37, modifiers, 'ArrowLeft');
}

export function arrowLeft(target: Element, modifiers: string | string[] = []): void {
  arrowLeftKeyDown(target, modifiers);
  arrowLeftKeyUp(target, modifiers);
}

export function arrowRightKeyDown(target: Element, modifiers: string | string[] = []): void {
  keyDownOn(target, 39, modifiers, 'ArrowRight');
}

export function arrowRightKeyUp(target: Element, modifiers: string | string[] = []): void {
  keyUpOn(target, 39, modifiers, 'ArrowRight');
}

export function arrowRight(target: Element, modifiers: string | string[] = []): void {
  arrowRightKeyDown(target, modifiers);
  arrowRightKeyUp(target, modifiers);
}

export function arrowUpKeyDown(target: Element, modifiers: string | string[] = []): void {
  keyDownOn(target, 38, modifiers, 'ArrowUp');
}

export function arrowUpKeyUp(target: Element, modifiers: string | string[] = []): void {
  keyUpOn(target, 38, modifiers, 'ArrowUp');
}

export function arrowUp(target: Element, modifiers: string | string[] = []): void {
  arrowUpKeyDown(target, modifiers);
  arrowUpKeyUp(target, modifiers);
}

export function homeKeyDown(target: Element, modifiers: string | string[] = []): void {
  keyDownOn(target, 36, modifiers, 'Home');
}

export function homeKeyUp(target: Element, modifiers: string | string[] = []): void {
  keyUpOn(target, 36, modifiers, 'Home');
}

export function home(target: Element, modifiers: string | string[] = []): void {
  homeKeyDown(target, modifiers);
  homeKeyUp(target, modifiers);
}

export function endKeyDown(target: Element, modifiers: string | string[] = []): void {
  keyDownOn(target, 35, modifiers, 'End');
}

export function endKeyUp(target: Element, modifiers: string | string[] = []): void {
  keyUpOn(target, 35, modifiers, 'End');
}

export function end(target: Element, modifiers: string | string[] = []): void {
  endKeyDown(target, modifiers);
  endKeyUp(target, modifiers);
}

export function enterKeyDown(target: Element, modifiers: string | string[] = []): void {
  keyDownOn(target, 13, modifiers, 'Enter');
}

export function enterKeyUp(target: Element, modifiers: string | string[] = []): void {
  keyUpOn(target, 13, modifiers, 'Enter');
}

export function enter(target: Element, modifiers: string | string[] = []): void {
  enterKeyDown(target, modifiers);
  enterKeyUp(target, modifiers);
}

export function escKeyDown(target: Element, modifiers: string | string[] = []): void {
  keyDownOn(target, 27, modifiers, 'Escape');
}

export function escKeyUp(target: Element, modifiers: string | string[] = []): void {
  keyUpOn(target, 27, modifiers, 'Escape');
}

export function esc(target: Element, modifiers: string | string[] = []): void {
  escKeyDown(target, modifiers);
  escKeyUp(target, modifiers);
}

export function spaceKeyDown(target: Element, modifiers: string | string[] = []): void {
  keyDownOn(target, 32, modifiers, ' ');
}

export function spaceKeyUp(target: Element, modifiers: string | string[] = []): void {
  keyUpOn(target, 32, modifiers, ' ');
}

export function space(target: Element, modifiers: string | string[] = []): void {
  spaceKeyDown(target, modifiers);
  spaceKeyUp(target, modifiers);
}

export function pageUpKeyDown(target: Element, modifiers: string | string[] = []): void {
  keyDownOn(target, 33, modifiers, 'PageUp');
}

export function pageUpKeyUp(target: Element, modifiers: string | string[] = []): void {
  keyUpOn(target, 33, modifiers, 'PageUp');
}

export function pageUp(target: Element, modifiers: string | string[] = []): void {
  pageUpKeyDown(target, modifiers);
  pageUpKeyUp(target, modifiers);
}

export function pageDownKeyDown(target: Element, modifiers: string | string[] = []): void {
  keyDownOn(target, 34, modifiers, 'PageDown');
}

export function pageDownKeyUp(target: Element, modifiers: string | string[] = []): void {
  keyUpOn(target, 34, modifiers, 'PageDown');
}

export function pageDown(target: Element, modifiers: string | string[] = []): void {
  pageDownKeyDown(target, modifiers);
  pageDownKeyUp(target, modifiers);
}
