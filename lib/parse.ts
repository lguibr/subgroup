import fs from 'fs-extra'
import { parse } from '@babel/parser'
import { Node } from '@babel/types'

const parseFile = async (
  absoluteFilePath: string,
  sourceType: "module" | "script" | "unambiguous" = 'unambiguous'): Promise<Node> => {
  const source = await fs.readFile(absoluteFilePath, 'utf8')
  return parse(
    source,
    {
      sourceType,
      sourceFilename: absoluteFilePath
    }
  );
}


export default parseFile

