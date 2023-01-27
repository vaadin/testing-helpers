import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

declare type Constructor<T> = new (...args: any[]) => T;

declare type ClassFactory = <T extends Constructor<HTMLElement>>(base: T) => T;

export const definePolymer = (prefix: string, htmlString: string, classFactory: ClassFactory): string => {
  const tag = `${prefix}-polymer-element`;

  class Base extends classFactory(PolymerElement) {
    static get template() {
      const tpl = document.createElement('template');
      tpl.innerHTML = htmlString;
      return tpl;
    }
  }

  customElements.define(tag, Base);

  return tag;
};

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
