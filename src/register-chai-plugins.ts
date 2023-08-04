import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import chai from '@esm-bundle/chai';
// @ts-expect-error sinon-chai is bundled by Rollup
import sinonChai from './plugins/sinon-chai.js';

chai.use(chaiDomDiff);
chai.use(sinonChai);
