import { nodeResolve } from '@rollup/plugin-node-resolve';
import auto from '@rollup/plugin-auto-install';

import { rollup, OutputOptions } from 'rollup'

const config = {
  inputConfig: {
    input: ['./example/index.js'],
    preserveModules: true,

  },
  outputConfig: {
    dir: './output',
    format: 'esm',

  },
  plugins: [
    auto(),
    nodeResolve({
      exportConditions: ['node']
    }),
  ]
};

const { inputConfig, outputConfig, plugins } = config

const run = async () => {
  const bundle = await rollup({
    ...inputConfig,
    plugins
  });

  const { output } = await bundle.generate({ ...outputConfig as OutputOptions, plugins });


  console.log(JSON.stringify({ bundle, output }, null, 2))
  await bundle.write({ ...outputConfig as OutputOptions, plugins });
  await bundle.close();

}

run()