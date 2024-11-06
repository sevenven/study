/**
 * @description 常用文件夹路径
 * @author seven
 */

const path = require('path');

const srcPath = path.join(__dirname, '..', 'src');
const distPath = path.join(__dirname, '..', 'dist');
const templatePath = path.join(__dirname, '..', 'template');

module.exports = {
	srcPath,
	distPath,
	templatePath
};
