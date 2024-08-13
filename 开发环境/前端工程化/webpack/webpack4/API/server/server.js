const config = require('./webpack.config');

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddlewar = require('webpack-dev-middleware');

const compiler = webpack(config);

const app = express();

app.use(webpackDevMiddlewar(compiler, {}));

app.listen(3000, () => {
	console.log('监听3000端口');
});
