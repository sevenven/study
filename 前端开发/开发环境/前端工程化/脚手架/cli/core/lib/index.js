'use strict';

const pkg = require('../../package.json');
const { log } = require('@cli/utils');

async function core() {
	try {
		checkPackageVersion();
		// checkNodeVersion();
		await checkRoot();
	} catch (error) {
		log.error(error.message);
	}
}

function checkPackageVersion() {
	log.notice('@cli/core:', pkg.version);
}

// function checkNodeVersion() {
// 	log.notice('node:', process.version);
// }

async function checkRoot() {
	const rootCheck = await import('root-check');
	rootCheck.default();
}

module.exports = core;
