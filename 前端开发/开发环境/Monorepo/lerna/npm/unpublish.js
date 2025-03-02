// 引入 child_process 模块的 exec 函数
const { exec } = require('child_process');

// 定义一个包含包信息的数组，每个包包含 name 和 version 属性
// const packages = [{ name: 'dayjs', version: '1.11.12' }];
const packages = [
	{ name: '@yarnpkg/lockfile', version: '1.1.0' },
	{ name: '@octokit/rest', version: '19.0.3' },
	{ name: 'add-stream', version: '1.0.0' },
	{ name: '@octokit/auth-token', version: '3.0.4' },
	{ name: 'axios', version: '1.7.9' },
	{ name: '@octokit/types', version: '8.2.1' },
	{ name: 'bl', version: '4.1.0' },
	{ name: 'agentkeepalive', version: '4.6.0' },
	{ name: 'are-we-there-yet', version: '3.0.1' },
	{ name: 'builtins', version: '5.1.0' },
	{ name: '@isaacs/string-locale-compare', version: '1.1.0' },
	{ name: '@nrwl/tao', version: '15.9.7' },
	{ name: 'npm-normalize-package-bin', version: '2.0.0' },
	{ name: 'before-after-hook', version: '2.2.3' },
	{ name: '@lerna/create', version: '6.5.1' },
	{ name: '@npmcli/installed-package-contents', version: '1.0.7' },
	{ name: 'semver', version: '7.7.1' },
	{ name: '@npmcli/arborist', version: '5.3.0' },
	{ name: '@octokit/plugin-request-log', version: '1.0.4' },
	{ name: '@types/minimatch', version: '3.0.5' },
	{ name: '@npmcli/run-script', version: '4.1.7' },
	{ name: '@nrwl/nx-win32-x64-msvc', version: '15.9.7' },
	{ name: '@hutson/parse-repository-url', version: '3.0.2' },
	{ name: '@npmcli/package-json', version: '2.0.0' },
	{ name: '@octokit/endpoint', version: '7.0.6' },
	{ name: '@npmcli/name-from-folder', version: '1.0.1' },
	{ name: '@octokit/types', version: '9.3.2' },
	{ name: '@octokit/request', version: '6.2.8' },
	{ name: '@octokit/openapi-types', version: '14.0.0' },
	{ name: '@octokit/openapi-types', version: '18.1.1' },
	{ name: '@npmcli/node-gyp', version: '2.0.0' },
	{ name: '@npmcli/map-workspaces', version: '2.0.4' },
	{ name: '@octokit/graphql', version: '5.0.6' },
	{ name: '@octokit/plugin-paginate-rest', version: '3.1.0' },
	{ name: '@octokit/plugin-rest-endpoint-methods', version: '6.8.1' },
	{ name: '@npmcli/promise-spawn', version: '3.0.0' },
	{ name: '@npmcli/move-file', version: '2.0.1' },
	{ name: 'byte-size', version: '7.0.0' },
	{ name: 'aproba', version: '2.0.0' },
	{ name: 'array-differ', version: '3.0.0' },
	{ name: '@octokit/openapi-types', version: '12.11.0' },
	{ name: '@npmcli/git', version: '3.0.2' },
	{ name: '@octokit/plugin-enterprise-rest', version: '6.0.1' },
	{ name: '@parcel/watcher', version: '2.0.4' },
	{ name: '@octokit/core', version: '4.2.4' },
	{ name: '@octokit/request-error', version: '3.0.3' },
	{ name: 'buffer', version: '5.7.1' },
	{ name: 'bin-links', version: '3.0.3' },
	{ name: 'cacache', version: '16.1.3' },
	{ name: '@nrwl/cli', version: '15.9.7' },
	{ name: '@yarnpkg/parsers', version: '3.0.0-rc.46' },
	{ name: '@lerna/child-process', version: '6.5.1' },
	{ name: 'npm-package-arg', version: '9.1.2' },
	{ name: '@nrwl/devkit', version: '15.9.7' },
	{ name: '@npmcli/metavuln-calculator', version: '3.1.1' },
	{ name: '@tootallnate/once', version: '2.0.0' },
	{ name: '@npmcli/fs', version: '2.1.2' },
	{ name: '@octokit/types', version: '6.41.0' },
	{ name: 'columnify', version: '1.6.0' },
	{ name: 'cmd-shim', version: '5.0.0' },
	{ name: 'common-ancestor-path', version: '1.0.1' },
	{ name: 'get-pkg-repo', version: '4.2.1' },
	{ name: 'deprecation', version: '2.3.1' },
	{ name: 'fastq', version: '1.19.0' },
	{ name: 'fs-constants', version: '1.0.0' },
	{ name: 'detect-indent', version: '5.0.0' },
	{ name: 'envinfo', version: '7.14.0' },
	{ name: 'conventional-changelog-writer', version: '5.0.1' },
	{ name: 'conventional-recommended-bump', version: '6.1.0' },
	{ name: 'execa', version: '5.0.0' },
	{ name: 'cosmiconfig', version: '7.0.0' },
	{ name: 'conventional-changelog-preset-loader', version: '2.3.4' },
	{ name: 'conventional-changelog-core', version: '4.2.4' },
	{ name: 'concat-stream', version: '2.0.0' },
	{ name: 'conventional-commits-parser', version: '3.2.4' },
	{ name: 'conventional-changelog-angular', version: '5.0.12' },
	{ name: 'dateformat', version: '3.0.3' },
	{ name: 'conventional-commits-filter', version: '2.0.7' },
	{ name: 'config-chain', version: '1.1.12' },
	{ name: 'dezalgo', version: '1.0.4' },
	{ name: 'gauge', version: '4.0.4' },
	{ name: 'form-data', version: '4.0.1' },
	{ name: 'debuglog', version: '1.0.1' },
	{ name: 'err-code', version: '2.0.3' },
	{ name: 'dot-prop', version: '6.0.1' },
	{ name: 'flat', version: '5.0.2' },
	{ name: 'exponential-backoff', version: '3.1.2' },
	{ name: 'glob', version: '8.1.0' },
	{ name: 'gitconfiglocal', version: '1.0.0' },
	{ name: 'git-remote-origin-url', version: '2.0.0' },
	{ name: 'get-port', version: '5.1.1' },
	{ name: 'get-stream', version: '6.0.0' },
	{ name: 'git-semver-tags', version: '4.1.1' },
	{ name: 'git-up', version: '7.0.0' },
	{ name: 'git-url-parse', version: '13.1.0' },
	{ name: 'handlebars', version: '4.7.8' },
	{ name: 'http-cache-semantics', version: '4.1.1' },
	{ name: 'hosted-git-info', version: '5.2.1' },
	{ name: 'http-proxy-agent', version: '5.0.0' },
	{ name: 'humanize-ms', version: '1.2.1' },
	{ name: 'ignore-walk', version: '5.0.1' },
	{ name: 'jsbn', version: '1.1.0' },
	{ name: 'inquirer', version: '8.2.6' },
	{ name: 'is-lambda', version: '1.0.1' },
	{ name: 'json-stringify-nice', version: '1.1.4' },
	{ name: 'lerna', version: '6.5.1' },
	{ name: 'init-package-json', version: '3.0.2' },
	{ name: 'ip-address', version: '9.0.5' },
	{ name: 'is-stream', version: '2.0.0' },
	{ name: 'just-diff', version: '5.2.0' },
	{ name: 'is-interactive', version: '1.0.0' },
	{ name: 'is-ssh', version: '1.4.0' },
	{ name: 'libnpmaccess', version: '6.0.3' },
	{ name: 'load-json-file', version: '6.2.0' },
	{ name: 'libnpmpublish', version: '6.0.4' },
	{ name: 'just-diff-apply', version: '5.5.0' },
	{ name: 'make-fetch-happen', version: '10.2.1' },
	{ name: 'lru-cache', version: '7.18.3' },
	{ name: 'lodash.ismatch', version: '4.4.0' },
	{ name: 'minipass-fetch', version: '2.1.2' },
	{ name: 'minimatch', version: '3.0.5' },
	{ name: 'minipass-json-stream', version: '1.0.2' },
	{ name: 'minipass-sized', version: '1.0.3' },
	{ name: 'modify-values', version: '1.0.1' },
	{ name: 'mkdirp-infer-owner', version: '2.0.0' },
	{ name: 'multimatch', version: '5.0.0' },
	{ name: 'fast-glob', version: '3.2.7' },
	{ name: '@zkochan/js-yaml', version: '0.0.6' },
	{ name: 'nx', version: '15.9.7' },
	{ name: 'cli-spinners', version: '2.6.1' },
	{ name: 'npmlog', version: '6.0.2' },
	{ name: 'lines-and-columns', version: '2.0.4' },
	{ name: 'glob', version: '7.1.4' },
	{ name: 'npm-registry-fetch', version: '13.3.0' },
	{ name: 'validate-npm-package-name', version: '3.0.0' },
	{ name: 'npm-bundled', version: '1.1.2' },
	{ name: 'builtins', version: '1.0.3' },
	{ name: 'npm-install-checks', version: '5.0.0' },
	{ name: 'normalize-package-data', version: '4.0.1' },
	{ name: 'npm-normalize-package-bin', version: '1.0.1' },
	{ name: 'node-gyp-build', version: '4.8.4' },
	{ name: 'nopt', version: '6.0.0' },
	{ name: 'npm-package-arg', version: '8.1.1' },
	{ name: 'node-gyp', version: '9.4.1' },
	{ name: 'npm-pick-manifest', version: '7.0.2' },
	{ name: 'npm-packlist', version: '5.1.1' },
	{ name: 'hosted-git-info', version: '3.0.8' },
	{ name: 'node-addon-api', version: '3.2.1' },
	{ name: 'node-fetch', version: '2.6.7' },
	{ name: 'parse-conflict-json', version: '2.0.2' },
	{ name: 'pacote', version: '13.6.1' },
	{ name: 'ora', version: '5.4.1' },
	{ name: 'p-waterfall', version: '2.1.1' },
	{ name: 'parse-path', version: '7.0.0' },
	{ name: 'pify', version: '5.0.0' },
	{ name: 'p-pipe', version: '3.1.0' },
	{ name: 'p-map-series', version: '2.1.0' },
	{ name: 'parse-url', version: '8.1.0' },
	{ name: 'p-reduce', version: '2.1.0' },
	{ name: 'p-timeout', version: '3.2.0' },
	{ name: 'p-queue', version: '6.6.2' },
	{ name: 'read-package-json-fast', version: '2.0.3' },
	{ name: 'promzard', version: '0.3.0' },
	{ name: 'proxy-from-env', version: '1.1.0' },
	{ name: 'read-cmd-shim', version: '3.0.0' },
	{ name: 'read', version: '1.0.7' },
	{ name: 'protocols', version: '2.0.1' },
	{ name: 'read-package-json', version: '5.0.1' },
	{ name: 'promise-call-limit', version: '1.0.2' },
	{ name: 'proc-log', version: '2.0.1' },
	{ name: 'promise-all-reject-late', version: '1.0.1' },
	{ name: 'promise-retry', version: '2.0.1' },
	{ name: 'readdir-scoped-modules', version: '1.1.0' },
	{ name: 'semver', version: '7.3.4' },
	{ name: 'smart-buffer', version: '4.2.0' },
	{ name: 'socks-proxy-agent', version: '7.0.0' },
	{ name: 'universal-user-agent', version: '6.0.1' },
	{ name: 'unique-filename', version: '2.0.1' },
	{ name: 'type-fest', version: '0.4.1' },
	{ name: 'write-file-atomic', version: '2.4.3' },
	{ name: 'write-json-file', version: '3.2.0' },
	{ name: 'wordwrap', version: '1.0.0' },
	{ name: 'validate-npm-package-name', version: '4.0.0' },
	{ name: 'webidl-conversions', version: '3.0.1' },
	{ name: 'write-file-atomic', version: '4.0.1' },
	{ name: 'upath', version: '2.0.1' },
	{ name: 'whatwg-url', version: '5.0.0' },
	{ name: 'walk-up-path', version: '1.0.0' },
	{ name: 'write-pkg', version: '4.0.0' },
	{ name: 'yargs-parser', version: '20.2.4' },
	{ name: 'strong-log-transformer', version: '2.1.0' },
	{ name: 'tar', version: '6.1.11' },
	{ name: 'split', version: '1.0.1' },
	{ name: 'sort-keys', version: '2.0.0' },
	{ name: 'ssri', version: '9.0.1' },
	{ name: 'tr46', version: '0.0.3' },
	{ name: 'treeverse', version: '2.0.0' },
	{ name: 'tar-stream', version: '2.2.0' },
	{ name: 'socks', version: '2.8.4' },
	{ name: 'unique-slug', version: '3.0.0' },
	{ name: 'typescript', version: '4.9.5' },
	{ name: 'sprintf-js', version: '1.1.3' },
	{ name: 'tsconfig-paths', version: '4.2.0' }
];

// 定义一个空数组，用于存储未成功取消发布的包
const failPackages = [];

// 将 exec 函数封装为返回 Promise 的函数
const execPromise = command => {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject({ error, stderr }); // 如果出错，返回错误信息
			} else {
				resolve(stdout); // 如果成功，返回标准输出
			}
		});
	});
};

// 定义一个异步函数，用于执行所有取消发布操作
const unpublishAllPackages = async () => {
	for (const pkg of packages) {
		// 构造 npm unpublish 命令，指定包名、版本号和私有注册表地址
		const command = `npm unpublish ${pkg.name}@${pkg.version} --registry http://172.16.19.229:4873/`;

		try {
			// 执行命令并等待结果
			const stdout = await execPromise(command);
			console.log(`stdout: ${stdout}`); // 打印标准输出
		} catch ({ error, stderr }) {
			// 如果命令执行失败，将包信息添加到 failPackages 数组中
			failPackages.push({ ...pkg });
			console.error(`error: ${error.message}`); // 打印错误信息
			if (stderr) {
				console.error(`stderr: ${stderr}`); // 打印标准错误流
			}
		}
	}

	// 所有命令执行完毕后，输出未成功取消发布的包列表
	console.log('未成功取消发布的包列表:', failPackages);
};

// 调用异步函数，开始执行取消发布操作
unpublishAllPackages();
