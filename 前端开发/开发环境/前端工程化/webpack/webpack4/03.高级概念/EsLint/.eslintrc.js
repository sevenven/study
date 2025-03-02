module.exports = {
	extends: 'airbnb',
	parser: 'babel-eslint',
	rules: {
		'react/prefer-stateless-function': 'off',
		'react/jsx-filename-extension': 'off',
		indent: ['error', '2']
	},
	globals: {
		document: false
	}
};
