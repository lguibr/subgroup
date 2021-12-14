import example from './example'
const isOdd = require('is-odd');


const isTwoOdd = isOdd(2)
const teste = require('./exampleNested')
const { named } = require('./exampleNested')


export default example
export { named, teste, isTwoOdd }
