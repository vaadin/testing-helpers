export const TOUCH_DEVICE = (() => {
  try {
    new Touch({ identifier: 1, target: window });
    return true;
  } catch (_) {
    return false;
  }
})();

/**
 * Returns the (x,y) coordinates representing the middle of a node.
 */
export function middleOfNode(node: Element): { x: number; y: number } {
  const bcr = node.getBoundingClientRect();
  return { y: bcr.top + bcr.height / 2, x: bcr.left + bcr.width / 2 };
}

/**
 * Returns a list of Touch objects that correspond to an array of positions
 * and a target node. The Touch instances will each have a unique Touch
 * identifier.
 *
 * @param {!Array<{ x: number, y: number }>} xyList A list of (x,y) coordinate
 * objects.
 * @param {!Element} node A target element node.
 * @return {!Array<!Touch>}
 */
export function makeTouches(xyList: Array<{ x: number; y: number }>, node: Element): Touch[] {
  let id = 0;

  return xyList.map((xy) => {
    id += 1;
    const touchInit = {
      identifier: id,
      target: node,
      clientX: xy.x,
      clientY: xy.y
    };

    return TOUCH_DEVICE ? new Touch(touchInit) : touchInit;
  }) as Touch[];
}

/**
 * Generates and dispatches a TouchEvent of a given type, at a specified
 * position of a target node.
 *
 * @param {string} type The type of TouchEvent to generate.
 * @param {{ x: number, y: number }} xy An (x,y) coordinate for the generated
 * TouchEvent.
 * @param {!Element} node The target element node for the generated
 * TouchEvent to be dispatched on.
 * @return {CustomEvent | TouchEvent}
 */
export function makeSoloTouchEvent(
  type: string,
  coords: { x: number; y: number } | undefined,
  node: Element,
  shiftKey?: boolean
): CustomEvent | TouchEvent {
  const xy = coords || middleOfNode(node);
  const touches = makeTouches([xy], node);
  const touchEventInit = {
    touches,
    targetTouches: touches,
    changedTouches: touches
  };

  let event: CustomEvent | TouchEvent;

  if (TOUCH_DEVICE) {
    // @ts-expect-error: emulate TouchEvent
    touchEventInit.bubbles = true;

    // @ts-expect-error: emulate TouchEvent
    touchEventInit.cancelable = true;
    event = new TouchEvent(type, touchEventInit);
  } else {
    event = new CustomEvent(type, {
      bubbles: true,
      cancelable: true,
      // Allow event to go outside a ShadowRoot.
      composed: true
    });
    Object.keys(touchEventInit).forEach((property) => {
      // @ts-expect-error: emulate TouchEvent
      event[property] = touchEventInit[property];
    });
  }

  if (shiftKey) {
    // Emulate shiftKey https://www.w3.org/TR/touch-events/#attributes-2
    Object.defineProperty(event, 'shiftKey', {
      get() {
        return true;
      }
    });
  }

  node.dispatchEvent(event);

  return event;
}

/**
 * Generate a touchstart event on a given node, optionally at a given
 * coordinate.
 */
export function touchstart(node: Element, coords?: { x: number; y: number }): void {
  const xy = coords || middleOfNode(node);
  makeSoloTouchEvent('touchstart', xy, node);
}

/**
 * Generate a touchend event on a given node
 */
export function touchend(node: Element, coords?: { x: number; y: number }): void {
  const xy = coords || middleOfNode(node);
  makeSoloTouchEvent('touchend', xy, node);
}

/**
 * Fires a mouse event on a specific node, at a given set of coordinates.
 * This event bubbles and is cancellable.
 *
 * @param {string} type The type of mouse event (such as 'tap' or 'down').
 * @param {{ x: number, y: number }} xy The (x,y) coordinates the mouse event
 * should be fired from.
 * @param {!Element} node The node to fire the event on.
 * @return {MouseEvent}
 */
export function makeMouseEvent(type: string, xy: { x: number; y: number }, node: Element): MouseEvent {
  const props = {
    bubbles: true,
    cancelable: true,
    clientX: xy.x,
    clientY: xy.y,
    composed: true,
    // Make this a primary input.
    buttons: 1 // http://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
  };
  const e = new MouseEvent(type, props);
  node.dispatchEvent(e);
  return e;
}

/**
 * Simulates a mouse move action by firing a `mousemove` mouse event on a
 * specific node, between a set of coordinates.
 *
 * @param {!Element} node The node to fire the event on.
 * @param {Object} fromXY The (x,y) coordinates the dragging should start from.
 * @param {Object} toXY The (x,y) coordinates the dragging should end at.
 * @param {?number=} steps Optional. The numbers of steps in the move motion.
 *    If not specified, the default is 5.
 * @return {undefined}
 */
export function mousemove(
  node: Element,
  fromXY: { x: number; y: number },
  toXY: { x: number; y: number },
  steps?: number
): void {
  steps = steps || 5;
  const dx = Math.round((fromXY.x - toXY.x) / steps);
  const dy = Math.round((fromXY.y - toXY.y) / steps);
  const xy = { x: fromXY.x, y: fromXY.y };
  for (let i = steps; i > 0; i--) {
    makeMouseEvent('mousemove', xy, node);
    xy.x += dx;
    xy.y += dy;
  }
  makeMouseEvent('mousemove', { x: toXY.x, y: toXY.y }, node);
}

/**
 * Fires a `mousedown` mouse event on a specific node, at a given set of coordinates.
 * This event bubbles and is cancellable. If the (x,y) coordinates are
 * not specified, the middle of the node will be used instead.
 *
 * @param {!Element} node The node to fire the event on.
 * @param {{ x: number, y: number }=} xy Optional. The (x,y) coordinates the
 * mouse event should be fired from.
 * @return {undefined}
 */
export function mousedown(node: Element, xy?: { x: number; y: number }): void {
  xy = xy || middleOfNode(node);
  makeMouseEvent('mousedown', xy, node);
}

/**
 * Fires an `mouseup` mouse event on a specific node, at a given set of coordinates.
 * This event bubbles and is cancellable. If the (x,y) coordinates are
 * not specified, the middle of the node will be used instead.
 *
 * @param {!Element} node The node to fire the event on.
 * @param {{ x: number, y: number }=} xy Optional. The (x,y) coordinates the
 * mouse event should be fired from.
 */
export function mouseup(node: Element, xy?: { x: number; y: number }): void {
  xy = xy || middleOfNode(node);
  makeMouseEvent('mouseup', xy, node);
}

/**
 * Fires a `click` event on a given node, optionally at a given set of coordinates.
 *
 * @param {!Element} node The node to fire the event on.
 * @param {{ x: number, y: number }=} xy Optional. The (x,y) coordinates the
 * mouse event should be fired from.
 */
export function click(node: Element, xy?: { x: number; y: number }): MouseEvent {
  xy = xy || middleOfNode(node);
  return makeMouseEvent('click', xy, node);
}

/**
 * Fires a 'tap' mouse event on a specific node, optionally at a given set of coordinates.
 *
 * @param {!Element} node The node to fire the event on.
 * @param {{ x: number, y: number }=} xy Optional. The (x,y) coordinates the
 * mouse event should be fired from.
 */
export function tap(node: Element, xy?: { x: number; y: number }): void {
  xy = xy || middleOfNode(node);
  mousedown(node, xy);
  mouseup(node, xy);
  click(node, xy);
}

/**
 * Emulates clicking outside the currently focused element.
 */
export function outsideClick(): void {
  // Move focus to body
  document.body.tabIndex = 0;
  // Mimic the mouse event
  mousedown(document.body);
  document.body.focus();
  document.body.tabIndex = -1;
  // Outside click
  document.body.click();
}

/**
 * Simulates a mouse or touch ragging action originating in the middle of a specific
 * node.
 *
 * @param {!Element} node The node to fire the event on.
 * @param {?number} dx The horizontal displacement.
 * @param {?number} dy The vertical displacement
 * @param {?number=} steps Optional. The numbers of steps in the dragging
 * motion. If not specified, the default is 5.
 */
export function track(node: Element, dx: number, dy: number, steps?: number): void {
  dx = dx | 0;
  dy = dy | 0;
  steps = steps || 5;
  if (TOUCH_DEVICE) {
    const xy = middleOfNode(node);
    touchstart(node, xy);
    for (let i = 0; i <= steps; i++) {
      makeSoloTouchEvent(
        'touchmove',
        {
          x: xy.x + (dx * i) / steps,
          y: xy.y + (dy * i) / steps
        },
        node
      );
    }
    touchend(node, { x: xy.x + dx, y: xy.y + dy });
  } else {
    mousedown(node);
    const xy = middleOfNode(node);
    const xy2 = { x: xy.x + dx, y: xy.y + dy };
    mousemove(node, xy, xy2, steps);
    mouseup(node, xy2);
  }
}

/**
 * @deprecated
 */
export const down = mousedown;

/**
 * @deprecated
 */
export const up = mouseup;

/**
 * @deprecated
 */
export const move = mousemove;
