import example from './example.js';
export { default } from './example.js';

const isOdd = require('is-odd');


const isTwoOdd = isOdd(2);
const teste = require('./exampleNested');
const { named } = require('./exampleNested');

export { isTwoOdd, named, teste };
