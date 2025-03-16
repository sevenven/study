#!/usr/bin/env node

console.log('hello world');

const argv = require('process').argv;

console.log('argv~~~', argv);

const command = argv[2];
console.log('command~~~', command);
