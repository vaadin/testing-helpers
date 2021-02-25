import { fixtureCleanup } from './fixture-no-side-effect.js';

export { fixtureSync } from './fixture-no-side-effect.js';

/**
 * This registers the fixture cleanup as a side effect
 */
try {
  // we should not assume that our users load mocha types globally
  if ('afterEach' in window) {
    // @ts-expect-error: mocha hook
    afterEach(() => {
      fixtureCleanup();
    });
  }
} catch (error) {
  /* do nothing */
}
