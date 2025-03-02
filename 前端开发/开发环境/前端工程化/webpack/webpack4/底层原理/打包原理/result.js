const graph = {
	'./src/index.js': {
		dependencies: {
			'./message.js': './src\\message.js'
		},
		code: '"use strict";\n\nvar _message = _interopRequireDefault(require("./message.js"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nconsole.log(_message.default);'
	},
	'./src\\message.js': {
		dependencies: {
			'./word.js': './src\\word.js'
		},
		code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.default = void 0;\nvar _word = require("./word.js");\nvar message = "say ".concat(_word.word);\nvar _default = exports.default = message;'
	},
	'./src\\word.js': {
		dependencies: {},
		code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.word = void 0;\nvar word = exports.word = \'hello\';'
	}
};

(function (graph) {
	function require(module) {
		var exports = {};
		(function (require, exports, code) {
			eval(code);
		})(relativePath => require(graph[module].dependencies[relativePath]), exports, graph[module].code);
		return exports;
	}
	require('./src/index.js');
})(graph);
