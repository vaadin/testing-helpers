import { html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Constructor } from './utils.js';

declare type ClassFactory = <T extends Constructor<HTMLElement>>(_base: T) => T;

export const defineLit = (prefix: string, htmlString: string, classFactory: ClassFactory): string => {
  const tag = `${prefix}-lit-element`;

  class Base extends classFactory(LitElement) {
    render() {
      return html`${unsafeHTML(htmlString)}`;
    }
  }

  customElements.define(tag, Base);

  return tag;
};
