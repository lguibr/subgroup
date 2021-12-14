import traverse from "@babel/traverse"
import * as t from '@babel/types'


// GROUP ImportDeclaration
// TODO should get all `import path` ImportDefaultSpecifier  ( id===null)
// TODO should get all `import default from path` ImportDefaultSpecifier  ( id===identifier)
// TODO should get all `import {defaultNamed} from path` ImportDefaultSpecifier  ( id===ObjectPattern)
// TODO should get all `import * as from path `  ImportNamespaceSpecifier
// TODO should get all `import {} `  ImportSpecifier

//GROUP ImportExpression
// TODO should get all `const dynamicImportedDefault = await import('')`  ImportExpression  ( id===identifier)
// TODO should get all `const {dynamicImportedNamed} = await import('')`  ImportExpression  ( id===ObjectPattern)

//GROUP  VariableDeclaration > VariableDeclarator (  init.calle.name === require  )
// TODO should get all `const default = require(path)` - VariableDeclaration > VariableDeclarator ( id===identifier && init.calle.name === require &&  )
// TODO should get all `const { named } = require(path)` - VariableDeclaration > VariableDeclarator ( id===ObjectPattern && init.calle.name === require &&  )

const transverseImports = (ast: t.Node) => {
  const importNodes: t.Node[] = []
  traverse(ast, {
    ImportDeclaration(path) {
      importNodes.push(path?.node)

    }

  });
  return { importNodes }
}

const transverseExports = (ast: t.Node) => {
  const exportNodes: t.Node[] = []
  traverse(ast, {
    ExportDeclaration(path) {
      exportNodes.push(path?.node)
    }
  });
  return { exportNodes }
}

export { transverseImports, transverseExports }