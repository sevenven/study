'use strict';

const log = require('npmlog');
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
log.addLevel('success', 2000, { fg: 'green', bold: true });
log.heading = 'cli';
log.headingStyle = { fg: 'blue', bg: 'black' };

module.exports = log;
