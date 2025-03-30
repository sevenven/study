const axios = require('axios');
const urlJoin = require('url-join');
const { execSync } = require('child_process');
const semver = require('semver');
const { DEFAULT_NPM_REGISTRY } = require('./constants');

// 获取当前 npm 源
function getNpmRegistry() {
	try {
		return execSync('npm config get registry', { encoding: 'utf8' }).trim();
	} catch (error) {
		return DEFAULT_NPM_REGISTRY;
	}
}

async function getNpmLatestVersion(npmName) {
	const registry = getNpmRegistry();
	const registryUrl = urlJoin(registry, npmName);
	const { data } = await axios.get(registryUrl);

	// 获取所有版本并排序
	const versions = Object.keys(data.versions);
	const sortedVersions = versions.sort((a, b) => (semver.gt(a, b) ? -1 : 1));

	// 返回最新版本
	return sortedVersions[0] || data['dist-tags'].latest;
}

module.exports = {
	getNpmLatestVersion,
	getNpmRegistry
};
