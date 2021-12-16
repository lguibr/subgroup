import generatePackageJson from './../../rollup-plugin-generate-package-json/src/index'
import { rollup, OutputOptions } from 'rollup'
import fs from 'fs-extra'
import path from 'path'
import alias from '@rollup/plugin-alias';




const build = async (entrypoints: string[], outputDir: string, projectRootDir: string, packagePath: string = './package.json') => {
  const packageAbsolutePath = path.resolve(projectRootDir, packagePath)
  const pkg = await fs.readJSON(packageAbsolutePath)
  const { imports } = pkg

  const importsEntries = Object.entries(imports) as [string, string][]

  const aliasMap = importsEntries.map(([alias, relativePath]) => ({
    find: alias.replaceAll('/*', ''), replacement: path.resolve(projectRootDir, relativePath.replaceAll('/*', ''))
  }))


  const config = {
    inputConfig: {
      input: entrypoints,
      preserveModules: true,

    },
    outputConfig: {
      dir: outputDir,
      format: 'module',
      name: 'MyBundle'

    },
    plugins: [
      alias({ entries: aliasMap }),
      generatePackageJson({
        baseContents: (pkg: any) => ({
          name: pkg.name,
          scripts: {
            start: 'node index.js'
          },
          dependencies: {},
          private: true
        })
      })
    ]
  };

  const { inputConfig, outputConfig, plugins } = config



  console.log('[')



  const bundle = await rollup({
    ...inputConfig,
    plugins
  });

  const { output } = await bundle.generate({ ...outputConfig as OutputOptions, plugins });


  const graph = bundle?.cache?.modules.map(({ id, dependencies }) => ({ dependencies, id }));

  console.log(JSON.stringify({ aliasMap }, null, 2))
  console.log(',')
  console.log(JSON.stringify({ graph }, null, 2))
  console.log(',')



  console.log(JSON.stringify({ bundle, output }, null, 2))

  await bundle.write({ ...outputConfig as OutputOptions, plugins });
  await bundle.close();

  console.log(']')
}

build(['/home/lg/Lab/subgroup/example/src/example.js'], '/home/lg/Lab/subgroup/output', '/home/lg/Lab/subgroup/example')