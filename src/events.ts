/**
 * Dispatches an event on the given node.
 */
export function fire(
  node: Node,
  eventType: string,
  detail?: Record<string, unknown>,
  eventProps?: Record<string, unknown>
): CustomEvent {
  const evt = new CustomEvent(eventType, { bubbles: true, composed: true, cancelable: true, detail: detail });
  Object.assign(evt, eventProps);
  node.dispatchEvent(evt);
  return evt;
}

/**
 * Dispatches a focusin event on the given node.
 */
export function focusin(node: Node, relatedTarget?: Node): CustomEvent {
  const eventProps = relatedTarget ? { relatedTarget } : {};
  return fire(node, 'focusin', undefined, eventProps);
}

/**
 * Dispatches a focusout event on the given node.
 */
export function focusout(node: Node, relatedTarget?: Node): CustomEvent {
  const eventProps = relatedTarget ? { relatedTarget } : {};
  return fire(node, 'focusout', undefined, eventProps);
}
