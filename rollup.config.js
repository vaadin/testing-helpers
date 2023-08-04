import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const plugins = ['sinon-chai'];

export default plugins.map((plugin) => ({
  input: plugin,
  output: {
    dir: 'dist/plugins'
  },
  plugins: [resolve(), commonjs()]
}));
