import parse from './lib/parse'
import { transverseExports, transverseImports } from './lib/transverse'

const subGroup = async (entrypoint: string[]) => {
  const parsedFiles = await Promise.all(entrypoint.map(entry => parse(entry)))

  const exported = await Promise.all(parsedFiles.map(file => transverseExports(file)))

  const imported = await Promise.all(parsedFiles.map(file => transverseImports(file)))

  console.log(` parsedFiles : ${JSON.stringify(parsedFiles, null, 2)}`)
  console.log(` exported : ${JSON.stringify(exported, null, 2)}`)
  console.log(` imported : ${JSON.stringify(imported, null, 2)}`)

}

const run = async () => {
  await subGroup(['./example/index.js'])
}

run()