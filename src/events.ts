/**
 * Dispatches an event on the given node.
 */
export function fire(
  node: Node,
  eventType: string,
  detail?: Record<string, unknown>,
  eventProps: EventInit & Record<string, unknown> = { bubbles: true, composed: true, cancelable: true }
): CustomEvent {
  const { bubbles = true, composed = true, cancelable = true, ...props } = eventProps;
  const evt = new CustomEvent(eventType, { bubbles, composed, cancelable, detail: detail });
  Object.assign(evt, props);
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
