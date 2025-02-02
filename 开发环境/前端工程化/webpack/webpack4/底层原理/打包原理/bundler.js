const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

// 模块分析
const moduleAnalyser = filename => {
	const content = fs.readFileSync(filename, 'utf-8');
	const ast = parser.parse(content, {
		sourceType: 'module'
	});
	const dependencies = {};
	traverse(ast, {
		ImportDeclaration({ node }) {
			const dirname = path.dirname(filename);
			const newFile = './' + path.join(dirname, node.source.value);
			dependencies[node.source.value] = newFile;
		}
	});
	const { code } = babel.transformFromAst(ast, null, {
		presets: ['@babel/preset-env']
	});
	return {
		filename,
		dependencies,
		code
	};
};

// 模块依赖分析
const makeDependenciesGraph = entry => {
	const entryModule = moduleAnalyser(entry);
	const graphArray = [entryModule];
	for (let i = 0; i < graphArray.length; i++) {
		const item = graphArray[i];
		const { dependencies } = item;
		if (dependencies) {
			for (let j in dependencies) {
				graphArray.push(moduleAnalyser(dependencies[j]));
			}
		}
	}
	const graph = {};
	graphArray.forEach(item => {
		graph[item.filename] = {
			dependencies: item.dependencies,
			code: item.code
		};
	});
	return graph;
};

// 生成打包代码
const generateCode = entry => {
	const graph = JSON.stringify(makeDependenciesGraph(entry));
	return `
		(function(graph){
			function require(module) { 
				var exports = {};
				(function(require, exports, code){
					eval(code)
				})(((relativePath) => require(graph[module].dependencies[relativePath])), exports, graph[module].code);
				return exports;
			};
			require('${entry}')
		})(${graph});
	`;
};

const code = generateCode('./src/index.js');
// console.log(code);
eval(code);
